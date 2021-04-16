const io = require("socket.io");

class Socket {
  constructor(server) {
    this.io = io(server);
    this._cons = {};
  }

  sendUsers() {
    let users = Object.values(this._cons);
    this.io.emit("get-users", JSON.stringify(users));
  }

  sendPrivUsers(roomId, isRoomClosed = false) {
    let temp = this.io.sockets.adapter.rooms.get(roomId);
    if (isRoomClosed) {
      this.io.sockets.emit("is-closed", "closed");
      this.io.sockets.emit("get-priv-users", JSON.stringify([]));
      return;
    }
    if (!temp) {
      // delete this if condition
      //this.io.to(roomId).emit("get-priv-users", JSON.stringify([]));
      this.io.sockets.emit("get-priv-users", JSON.stringify([]));
      return;
    }
    let users = [...temp];
    users = users.filter((id) => {
      if (this._cons[id]) {
        return this._cons[id];
      }
      return null;
    });
    this.io.to(roomId).emit("get-priv-users", JSON.stringify(users));
  }

  listen() {
    this.io.on("connection", (socket) => {
      let socketRoomId = socket.id;
      socket.on("disconnect", (msg) => {
        delete this._cons[socket.id];
        this.sendUsers();
      });
      socket.on("u-name", (msg) => {
        this._cons[socket.id] = msg;
        socket.emit("get-num", socket.id);
        //console.log(this._cons);
        this.sendUsers();
      });

      socket.on("send-pub-message", (message) => {
        this.io.emit(
          "chat",
          JSON.stringify({ name: this._cons[socket.id], msg: message })
        );
      });

      socket.on("create-room", (msg) => {
        socket.join(socketRoomId);
        this.io.sockets.in(socketRoomId).emit("priv-room-id", socketRoomId);
        this.sendPrivUsers(socketRoomId);

        //console.log(this.io.sockets.adapter.rooms.get(socketRoomId.toString()));
        //this.io.sockets.adapter.rooms.get(socketRoomId.toString())
        //this.io.in(socketRoomId.toString()).allSockets()
        //this.io.sockets.adapter.rooms
      });
      socket.on("send-priv-message", (message) => {
        let data = JSON.parse(message);
        this.io.to(data.roomId).emit(
          "priv-chat",
          JSON.stringify({
            name: this._cons[socket.id],
            msg: data.message,
          })
        );
      });
      socket.on("get-num", (msg) => {
        socket.emit(
          "get-num",
          "number of users in room : " +
            JSON.stringify(this.io.sockets.clients(socketRoomId))
        );
      });
      socket.on("join-room", (roomId) => {
        socket.join(roomId);
        this.sendPrivUsers(roomId);
      });

      socket.on("close-room", (roomId) => {
        //this.io.to(roomId).emit("get-priv-users", JSON.stringify([]));
        this.sendPrivUsers(roomId, true);
        console.log(this.io.sockets.socketsLeave(roomId));
        //this.sendPrivUsers(roomId);
      });

      socket.on("leave-room", (roomId) => {
        console.log("room iD : ", roomId);
        socket.leave(roomId);
        this.sendPrivUsers(roomId);
      });
    });
  }
}

module.exports = Socket;
