/**
 * @desc Creates a new event by an organizer
 * @route POST /events
 * @access Private (only for users with organizer role)
 */
const eventModel = require("../models/event.model");
const db = require("../config/db");

exports.createEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, time, ...rest } = req.body;

    // Validación de rol - destructuring para obtener solo el array de resultados
    const [userRows] = await db.query(
      "SELECT user_type_id FROM users WHERE id = ?",
      [userId]
    );

    // Si no existe el usuario o no es organizador
    if (!userRows[0] || userRows[0].user_type_id !== 2) {
      return res
        .status(403)
        .json({ message: "Only organizers can create events" });
    }
    // Validar que date y time estén definidos y no vacíos
    if (!date || !time) {
      return res.status(400).json({ message: "Date and time are required." });
    }
    // Insertar evento usando el modelo
    await eventModel.insertEvent({ ...req.body, organizer_id: userId });

    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Retrieves all events created by the logged-in organizer
 * @route GET /events/my
 * @access Private (organizers only)
 */
exports.getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.userType !== 2) {
      return res.status(403).json({ message: "Organizer access only." });
    }

    const [events] = await eventModel.getEventsByOrganizer(userId);

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching organizer events:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
/**
 * @desc Retrieves all public events (for assistants or general browsing)
 * @route GET /events
 * @access Public
 */
exports.getAllEvents = async (req, res) => {
  try {
    const [events] = await eventModel.getAllPublicEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching all events:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
