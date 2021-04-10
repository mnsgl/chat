const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  mail: { type: String, require: true },
  pass: { type: String, require: true },
});

module.exports = mongoose.model("User", userSchema);
