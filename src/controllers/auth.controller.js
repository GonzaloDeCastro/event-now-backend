const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

/**
 * Controller for user login.
 * Validates credentials, checks password, and returns a JWT token if successful.
 *
 * @route POST /api/users/login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {JSON} User info and JWT token or error
 */
exports.loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Ensure both fields are provided
    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ error: "Email or username and password are required" });
    }

    // Look for user by email or username
    const user = await userModel.findUserByEmailOrUsername(
      emailOrUsername,
      emailOrUsername
    );

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return token and basic user info
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role_id,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/users/me
exports.getCurrentUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findUserById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role_id,
    });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
