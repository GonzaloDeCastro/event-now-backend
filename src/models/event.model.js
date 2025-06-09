const db = require("../config/db");

// Inserts a new event in the database
const insertEvent = async (eventData) => {
  const {
    organizer_id,
    title,
    description,
    category,
    image_url,
    city,
    province,
    location,
    location_type,
    date,
    time,
    is_free,
    price,
    discount_percent,
    capacity,
    age_restriction,
    has_checkin,
  } = eventData;
  console.log("entra algo ? ", db);
  return await db.query(
    `INSERT INTO events (
      organizer_id, title, description, category, image_url, city, province,
      location, location_type, date, time, is_free, price,
      discount_percent, capacity, age_restriction, has_checkin
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      organizer_id,
      title,
      description,
      category,
      image_url,
      city,
      province,
      location,
      location_type,
      date,
      time,
      is_free,
      price,
      discount_percent,
      capacity,
      age_restriction,
      has_checkin,
    ]
  );
};

// Gets events by organizer ID
const getEventsByOrganizer = async (organizerId) => {
  return await db.query("SELECT * FROM events WHERE organizer_id = ?", [
    organizerId,
  ]);
};

// Gets all public events for listing
const getAllPublicEvents = async () => {
  return await db.query(
    `SELECT    
      id,
      title,
      description,
      category,
      image_url,
      city,
      province,
      location,
      location_type,
      date,
      time,
      is_free,
      price,
      discount_percent,
      capacity,
      registered_count,
      age_restriction,
      rating 
    FROM events 
    ORDER BY date ASC, time ASC`
  );
};

module.exports = {
  insertEvent,
  getEventsByOrganizer,
  getAllPublicEvents,
};
