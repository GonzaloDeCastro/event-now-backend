const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

/**
 * Controller for registering a new user (assistant or organizer).
 * Validates required fields, checks for duplicates, hashes the password,
 * and inserts into the appropriate tables based on user type.
 *
 * @route POST /api/users/register
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {JSON} Confirmation message or error
 */
exports.registerUser = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
      confirmPassword,
      userType, // Expected values: 'assistant' or 'organizer'
      age, // Required if userType === 'assistant'
      preferences, // Optional array of preferences
      legal_name,
      tax_id,
      phone,
      legal_address,
      website,
    } = req.body;

    // Basic validation
    if (!fullName || !username || !email || !password || !userType) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    // Check if the user already exists by email or username
    const existingUser = await userModel.findUserByEmailOrUsername(
      email,
      username
    );
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Email or username already exists." });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine user type ID (1 = assistant, 2 = organizer)
    const userTypeId = userType === "assistant" ? 1 : 2;

    // Insert into the 'users' table and get the new user ID
    const userId = await userModel.insertUser({
      fullName,
      username,
      email,
      hashedPassword,
      userTypeId,
    });

    // If the user is an assistant, insert extra info into 'assistants' table
    if (userType === "assistant") {
      if (!age) {
        return res
          .status(400)
          .json({ error: "Age is required for assistants." });
      }

      await userModel.insertAssistantData(userId, age, preferences);
    }
    if (userType === "organizer") {
      await userModel.insertOrganizerData(
        userId,
        legal_name,
        tax_id,
        phone,
        legal_address,
        website
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: userId, userType: userTypeId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Return success response
    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        id: userId,
        username,
        email,
        userType: userTypeId,
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};
