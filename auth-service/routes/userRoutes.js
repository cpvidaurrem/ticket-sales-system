import express from "express";
import { register, login } from "../controllers/userController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Ruta protegida de prueba
router.get("/perfil", auth, (req, res) => {
  res.json({ msg: "Perfil del usuario", user: req.user });
});

export default router;
