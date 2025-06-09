const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token from the Authorization header.
 * If valid, attaches the decoded user info to req.user.
 * If missing or invalid, returns a 401 Unauthorized error.
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware function
 */
const verifyToken = (req, res, next) => {
  try {
    // Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided." });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request
    req.user = {
      id: decoded.userId,
      userType: decoded.userType, // 1 = assistant, 2 = organizer
    };

    next();
  } catch (error) {
    console.error("Invalid token:", error.message);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
