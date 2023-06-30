const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect("mongodb://127.0.0.1:27017/PERSONAL");
    console.log("database connected successfully");
  } catch (error) {
    console.log("database error");
  }
};
module.exports = dbConnect;
