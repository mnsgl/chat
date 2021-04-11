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

  sendPrivUsers(roomId) {
    let users = [...this.io.sockets.adapter.rooms.get(roomId)];
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
        console.log(this._cons);
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
        socket.emit("priv-room-id", socketRoomId);
        this.sendPrivUsers(socketRoomId);

        //console.log(this.io.sockets.adapter.rooms.get(socketRoomId.toString()));
        //this.io.sockets.adapter.rooms.get(socketRoomId.toString())
        //this.io.in(socketRoomId.toString()).allSockets()
        //this.io.sockets.adapter.rooms
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
        this.io.sockets.clients(roomId).forEach((client) => {
          client.leave(roomId);
        });
        this.sendPrivUsers(roomId);
      });

      socket.on("leave-room", (roomId) => {
        socket.leave(roomId);
        this.sendPrivUsers(roomId);
      });
    });
  }
}

module.exports = Socket;
