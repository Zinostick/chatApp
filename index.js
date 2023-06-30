const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const mongoose = require("mongoose");
//const ObjectId = require("mongoose").Types.ObjectId;
///const idParam = new ObjectId(param.length < 12 ? "123456789012" : param);
const dbConnect = require("./dbConnect");
const Message = require("./chatModel");
const Room = require("./roomModel");
const Dance = require("./userModel");
const createUser = require("./user");
//const createUser = require("./user");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dbConnect();
Message();
Room();
Dance();

const PORT = 3001;

app.post("/user", createUser);

/*app.post("/message", async (req, res) => {
  try {
    const { senderID, receiverID, content } = req.body;

    const message = new Message({
      sender: senderID,
      receiver: receiverID,
      content: content,
    });
    await message.save();
    console.log(message);

    //res.status(200).json({ message: "Message sent successfully" });
    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.get("/messages", a sync (req, res) => {
  try {
    const { senderID, receiverID } = req.params || req.params;

    const messages = await Message.find({
      $or: [
        {
          sender: senderID,
          receiver: receiverID,
        },
        {
          sender: senderID,
          receiver: senderID,
        },
      ],
    }).sort({ createdAt: 1 });

    console.log(messages);

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve message" });
  }
});*/

app.post("/private-message", async (req, res) => {
  try {
    const { senderID, receiverID, content } = req.body;
    const message = new Message({
      sender: senderID,
      receiver: receiverID,
      content: content,
    });
    await message.save();
    io.emit("privateData", message);
    res.status(200).send("post data sent");
    //console.log(message);
  } catch (error) {
    console.error(error);
  }
});

io.on("connection", (socket) => {
  socket.on("privateData", (message) => {
    console.log(message);
    console.log(socket.receiverID);
  });
  console.log("New web socket connection...");

  const clients = [];

  socket.on("join room", async (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
    clients.push(senderID);
  });

  //room messages
  socket.on("roomMessage", async ({ sendID, room, messageContent }) => {
    try {
      const message = new Message({
        send: sendID,
        room: room,
        messageContent: messageContent,
      });

      await message.save();
      io.to(room).emit("newRoomMessage", message);
    } catch (error) {
      console.error(error);
    }
  });
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
