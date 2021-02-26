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

io.on("connection", (socket) => {
  console.log("Socket connected, id", socket.id);
  //   socket.emit("message", { message: "Hello from server" });

  socket.on("message", (data) => {
    console.log(data);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
