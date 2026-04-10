const MongoURI = "mongodb://localhost:27017/tasks";
console.log(MongoURI);

const mongoose = require("mongoose");

mongoose.connect(MongoURI);
const taskSchema = mongoose.Schema({
     id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Task", taskSchema);