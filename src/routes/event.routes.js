const {
  createEvent,
  getMyEvents,
  getAllEvents,
} = require("../controllers/event.controller");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

// event.routes.js
router.post("/", verifyToken, createEvent); // solo logueados
router.get("/my", verifyToken, getMyEvents);
router.get("/", getAllEvents); // acceso público
//router.put("/:id", verifyToken, updateEvent);
//router.delete("/:id", verifyToken, deleteEvent);
module.exports = router;
