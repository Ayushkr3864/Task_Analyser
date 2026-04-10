const express = require("express");
const app = express.Router();
const { getTask, postTask,updateStatus,deleteTask } = require("../controller/Task.controller")
const protect = require("../middleware/auth")
//display task
app.get("/", protect, getTask);

//create task route
app.post("/",protect, postTask)

app.patch("/:id", protect, updateStatus);

app.delete("/:id", protect, deleteTask);

module.exports = app;