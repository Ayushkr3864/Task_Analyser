const express = require("express");
const app = express.Router();
const { register, loginUser, logoutUser, isAuth } = require("../controller/auth.controller")
const protect = require("../middleware/auth")
app.post("/register", register)
app.post("/login", loginUser)
app.post("/logout", logoutUser)
app.get("/isAuth",protect,isAuth)
module.exports = app