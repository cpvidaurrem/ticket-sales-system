import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { registerUser, findUserByEmail } from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existe = await findUserByEmail(email);
    if (existe) return res.status(400).json({ msg: "El usuario ya existe" });

    const user = await registerUser(nombre, email, password, rol);

    res.json({ msg: "Registrado correctamente", user });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ msg: "Credenciales inválidas" });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        rol: user.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ msg: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error });
  }
};
