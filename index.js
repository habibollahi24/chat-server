const express = require("express");
const { createServer } = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

const app = express();
app.use(cors());
const httpServer = createServer(app);

const io = new Server(httpServer, {
  /* options */
  cors: "*",
});

io.on("connection", (socket) => {
  console.log("conected to socket");

  socket.on("submit", (data) => {
    socket.join(data.id);
    console.log(data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.userId).emit("receive_message", data);
  });

  //
  //
  //
  //disconnect emit
  socket.on("disconnect", () => {
    console.log("disconnect from socket");
  });
});

app.get("/", (req, res) => {
  res.send("running");
});

httpServer.listen(3000, () => {
  console.log("RUN SERVER");
});
