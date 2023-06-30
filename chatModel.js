const mongoose = require("mongoose");

//message schema

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dance",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dance",
  },
  content: {
    type: String,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
