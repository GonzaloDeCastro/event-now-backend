const express = require("express");
const router = express.Router();

// Controlador (por ahora solo un placeholder)
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

// Ruta de prueba
router.get("/ping", (req, res) => {
  res.json({ message: "User route alive" });
});

// Placeholder para futuras rutas
router.post("/register", userController.registerUser);
router.post("/login", authController.loginUser);
router.get("/me", authController.getCurrentUser);

// router.post('/login', userController.loginUser);

module.exports = router;
