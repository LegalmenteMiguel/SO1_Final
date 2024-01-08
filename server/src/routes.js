const { Router } = require("express");

const { login, createUser, updateUser, getUsers, deleteUser } = require("./db");

const router = Router();

router.post("/login", login);
router.post("/createUser", createUser);
router.put("/updateUser", updateUser);
router.get("/getUsers/:user", getUsers);
router.delete("/deleteUser/:user", deleteUser);

module.exports = router;