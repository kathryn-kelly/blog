let mongoose = require("mongoose");
let Schema = mongoose.Schema;

module.exports = mongoose.model(
  "User",
  new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    user: { type: String, required: true },
    admin: Boolean
  })
);
