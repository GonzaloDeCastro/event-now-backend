const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./config/db");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
const userRoutes = require("./routes/user.routes");
const eventRoutes = require("./routes/event.routes");

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

// Default
app.get("/", (req, res) => {
  res.send("Event Now API");
});

(async () => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("DB Connected:", rows[0].result);
  } catch (err) {
    console.error("DB Connection Error:", err.message);
  }
})();

module.exports = app;
