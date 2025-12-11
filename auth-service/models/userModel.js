import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(50),
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      rol VARCHAR(20) DEFAULT 'usuario'
    );
  `;
  await pool.query(query);
};

export const registerUser = async (nombre, email, password, rol = "usuario") => {
  const hashed = await bcrypt.hash(password, 10);
  const query = `
      INSERT INTO users (nombre, email, password, rol)
      VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const values = [nombre, email, hashed, rol];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
