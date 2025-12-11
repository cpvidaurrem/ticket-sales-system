import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { createUserTable } from "./models/userModel.js";

dotenv.config();

const app = express();
app.use(express.json());

createUserTable();

app.use("/api/usuarios", userRoutes);

app.listen(3001, () =>
  console.log("Servicio Usuarios corriendo en puerto 3001")
);
