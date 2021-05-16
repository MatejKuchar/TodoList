const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    require: true,
  },
  dateTime: {
    type: String,
    require: true,
  },
});

const Todo = mongoose.model("todo", TodoSchema);
module.exports = Todo;
