const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("add-new-user", (newUserId) => {
    if (!onlineUsers.some((onlineUser) => onlineUser.userId === newUserId)) {
      onlineUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    io.emit("get-online-users", onlineUsers);
    console.log(onlineUsers);
  });

  socket.on("send-message", (message) => {
    const { receiverId } = message;
    const receiverUser = onlineUsers.find((user) => user.userId === receiverId);
    if (receiverUser) {
      io.to(receiverUser.socketId).emit("receive-message", message);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
  });
});
