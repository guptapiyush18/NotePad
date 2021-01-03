const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
})

module.exports = mongoose.model("Note", noteSchema);
