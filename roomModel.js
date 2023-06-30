const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  send: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dance",
  },
  room: {
    type: String,
  },
  messageContent: {
    type: String,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", roomSchema);
