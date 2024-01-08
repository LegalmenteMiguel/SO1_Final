import React, { useState } from "react";

import "./App.css";

const {
  login,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("./services");

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleLogin = async () => {
    console.log("user: ", user);
    await login(user, password);
  };

  const handleCreateUser = async () => {
    await createUser(user, password);
  };

  const handleGetUsers = async () => {
    try {
      const res = await getUsers(user);
      if (res.length === 0) {
        alert("User not found");
      }
      setUsers(res);
    } catch (error) {}
  };

  const handleUpdateUser = async () => {
    await updateUser(user, password);
  };

  const handleDeleteUser = async () => {
    await deleteUser(user, password);
  };

  return (
    <div>
      <h2>SO1 Examen Final</h2>
      <form>
        <label>
          Usuario:
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <div>
          <button
            type="button"
            onClick={handleLogin}
            style={{ marginRight: "10px" }}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={handleCreateUser}
            style={{ marginRight: "10px" }}
          >
            Crear Usuario
          </button>
          <button
            type="button"
            onClick={handleGetUsers}
            style={{ marginRight: "10px" }}
          >
            Buscar Usuario
          </button>
          <button
            type="button"
            onClick={handleUpdateUser}
            style={{ marginRight: "10px" }}
          >
            Modificar Usuario
          </button>
          <button
            type="button"
            onClick={handleDeleteUser}
            style={{ marginRight: "10px" }}
          >
            Elimnar Usuario
          </button>
        </div>
      </form>

      {users.length > 0 && (
        <div>
          <h3>Usuarios Encontrados:</h3>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
