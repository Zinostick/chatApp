const { error } = require("console");
const Dance = require("./userModel");
const { default: mongoose } = require("mongoose");

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = new Dance({
      name: name,
      email: email,
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

/*const chatMessage = async (req, res) => {
  try {
    const { senderID, receiverID } = req.params;
    const existingUser = await Dance.findById(senderID);
    if (!existingUser) {
      throw Error("This user does not exist");
    }

    const session = await mongoose.startSession();
    session.startTransaction();
  } catch (error) {
    console.error(error);
  }
};*/

module.exports = createUser;
