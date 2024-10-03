const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completedOn: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema);
