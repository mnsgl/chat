import { io } from "socket.io-client";

class Socket {
  constructor(domain) {
    this._config = { transports: ["websocket", "polling", "flashsocket"] };
    this._socket = io(domain, this._config);
    this._owner = null;
    this.isStart = true;
    this.domain = domain;
    this._users = [];
    this._privUsers = [];
    this._privRoomId = null;
  }
  start(name) {
    //this._socket = io(this.domain, this._config);
    if (this.isStart) {
      this._owner = name;
      this.sendName(name);
      this.listenUsers();
    }
    this.isStart = false;
  }

  listenUsers() {
    this._socket.on("get-users", (users) => {
      this._users = JSON.parse(users);
    });
  }

  getUsers() {
    return this._users;
  }

  sendName(name) {
    console.log("name : ", name);
    this._socket.on("get-num", (number) => {
      this._privRoomId = number;
    });
    this._socket.emit("u-name", name);
  }

  sendMessage(message) {
    if (!message) {
      return;
    }
    this._socket.emit("send-pub-message", message);
  }

  sendPrivMessage(message) {
    if (!message) {
      return;
    }
    let data = { message: message, roomId: this._privRoomId };
    this._socket.emit("send-priv-message", JSON.stringify(data));
  }

  getSocket() {
    return this._socket;
  }

  joinRoom(roomId) {
    this._socket.emit("join-room", roomId);
    this._privRoomId = roomId;
    this.listenPrivUsers();
  }

  createRoom() {
    this._socket.emit("create-room", this._owner);
    /*
    this._socket.on("priv-room-id", (id) => {
      this._privRoomId = id;
      console.log("alindi: ", id);
    });
		*/
    this.listenPrivUsers();
  }
  getPrivUsers() {
    return this._privUsers;
  }

  getPrivRoomId() {
    return this._privRoomId;
  }

  listenPrivUsers() {
    this._socket.on("get-priv-users", (users) => {
      this._privUsers = JSON.parse(users);
      console.log("......... : " + this._privUsers.length);
    });
  }

  closeRoom() {
    this._socket.emit("close-room", this._privRoomId);
  }

  leaveRoom(roomId) {
    this._socket.emit("leave-room", roomId);
  }
}

export default Socket;
