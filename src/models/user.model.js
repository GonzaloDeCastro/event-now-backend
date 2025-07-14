const db = require("../config/db");

/**
 * Finds a user by email or username.
 * Used to check if a user already exists during registration.
 *
 * @param {string} email - The email to search for.
 * @param {string} username - The username to search for.
 * @returns {Promise<object|undefined>} The user object if found, or undefined.
 */
exports.findUserByEmailOrUsername = async (email, username) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ? OR username = ?",
    [email, username]
  );
  return rows[0];
};

/**
 * Inserts a new user into the 'users' table.
 *
 * @param {object} userData - An object containing user fields.
 * @param {string} userData.fullName - Full name of the user.
 * @param {string} userData.username - Chosen username.
 * @param {string} userData.email - Email address.
 * @param {string} userData.hashedPassword - Bcrypt-hashed password.
 * @param {number} userData.userTypeId - Foreign key referencing user_type.
 * @returns {Promise<number>} The newly inserted user's ID.
 */
exports.insertUser = async (userData) => {
  const { fullName, username, email, hashedPassword, userTypeId } = userData;

  const [result] = await db.query(
    `INSERT INTO users (full_name, username, email, password, role_id) 
     VALUES (?, ?, ?, ?, ?)`,
    [fullName, username, email, hashedPassword, userTypeId]
  );
  return result.insertId;
};

/**
 * Inserts assistant-specific data into the 'assistants' table.
 *
 * @param {number} userId - The ID of the user (foreign key).
 * @param {number} age - The user's age.
 * @param {Array<string>} preferences - Array of user preferences (e.g. event types).
 * @returns {Promise<object>} The result of the insert query.
 */
exports.insertAssistantData = async (userId, age, preferences) => {
  const [result] = await db.query(
    `INSERT INTO assistants (user_id, age, preferences)
     VALUES (?, ?, ?)`,
    [userId, age, JSON.stringify(preferences || [])]
  );
  return result;
};

/**
 * Inserts organizer-specific data into the 'organizers' table.
 *
 * @param {number} userId - The ID of the user (foreign key).
 * @param {string} legal_name - Name of the organization.
 * @param {string} tax_id - CUIT (Argentine tax ID).
 * @param {string} phone - Organizer's contact number.
 * @param {string} legal_address - Organizer's address.
 * @returns {Promise<object>} The result of the insert query.
 */
exports.insertOrganizerData = async (
  userId,
  legal_name,
  tax_id,
  phone,
  legal_address,
  website
) => {
  const [result] = await db.query(
    `INSERT INTO organizers (user_id, legal_name, tax_id, phone, legal_address,website)
     VALUES (?, ?, ?, ?, ?,?)`,
    [userId, legal_name, tax_id, phone, legal_address, website]
  );
  return result;
};

/**
 * Finds a user by their I D
 * @param {number} userId - ID of the user
 * @returns {Promise<Object|null>} User object or null if not found
 */
exports.findUserById = async (userId) => {
  const [rows] = await db.query(
    `SELECT id, username, email, role_id FROM users WHERE id = ?`,
    [userId]
  );
  return rows[0] || null;
};
