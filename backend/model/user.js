const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  userId: { type: String, required: true },
  emailId: { type: String, required: true },
  password: {type: String, required: true}
})

module.exports = mongoose.model("Users",userSchema);
