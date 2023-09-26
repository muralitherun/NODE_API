const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  completed: { type: Boolean, default: false },
  no: [{type: Number, required: true, default: 0}]
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;