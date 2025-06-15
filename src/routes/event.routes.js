const {
  createEvent,
  getMyEventsByOrganizer,
  getAllEvents,
  getEventById,
} = require("../controllers/event.controller");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

// event.routes.js
router.post("/", verifyToken, createEvent); // solo logueados
router.get("/by-organizer", verifyToken, getMyEventsByOrganizer);
router.get("/", getAllEvents); // acceso público
router.get("/by-id/:id", verifyToken, getEventById);

//router.put("/:id", verifyToken, updateEvent);
//router.delete("/:id", verifyToken, deleteEvent);
module.exports = router;
