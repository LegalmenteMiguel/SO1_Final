const { createConnection } = require("mysql2/promise");

require("dotenv").config();

// Función para conectar a la base de datos
const connectDB = async () => {
  // Variable para almacenar la conexión
  let connection = null;

  if (!connection)
    connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      port: parseInt(process.env.DB_PORT),
    });
  return connection;
};

// Realiza el login
const login = async (req, res) => {
  const { user, password } = req.body;
  const db = await connectDB();

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [user, password]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "Welcome " + rows[0].username });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    db.end();
  }
};

// Crea un usuario
const createUser = async (req, res) => {
  const { user, password } = req.body;
  const db = await connectDB();

  try {
    const [rows] = await db.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [user, password]
    );

    return res.status(200).json({ message: "User created" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY")
      return res.status(404).json({ message: "User already exist." });
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    db.end();
  }
};

// Modifica un usuario
const updateUser = async (req, res) => {
  const { user, password } = req.body;
  const db = await connectDB();

  try {
    const [rows] = await db.execute(
      "UPDATE users SET password = ? WHERE username = ?",
      [password, user]
    );
    if (rows.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User modified" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    db.end();
  }
};

// Obtiene los usuarios
const getUsers = async (req, res) => {
  const { user } = req.params;
  const db = await connectDB();

  try {
    const [rows] = await db.execute(
      "SELECT username FROM users WHERE username LIKE ?",
      [`%${user}%`]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    db.end();
  }
};

// Elimina un usuario
const deleteUser = async (req, res) => {
  const { user } = req.params;
  const { password } = req.body;
  const db = await connectDB();

  try {
    const [rows] = await db.execute(
      "DELETE FROM users WHERE username = ? AND password = ?",
      [user, password]
    );
    if (rows.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    db.end();
  }
};

module.exports = {
  login,
  createUser,
  updateUser,
  getUsers,
  deleteUser,
};
