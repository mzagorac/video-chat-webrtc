const cors = require("cors");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("Socket connected, id", socket.id);

  const rooms = io.of("/").adapter.rooms;
  if (!rooms.get("room") || rooms.get("room").size < 2) {
    socket.join("room");
  }

  console.log(Array.from(rooms.get("room")));

  socket.on("offer", (offer) => {
    socket.to("room").emit("message", { offer });
    console.log(offer);
  });
  socket.on("answer", (answer) => {
    socket.to("room").emit("message", { answer });
    console.log(answer);
  });
});
