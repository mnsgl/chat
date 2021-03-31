import { io } from "socket.io-client";

class Socket {
  constructor(domain) {
    this._config = { transports: ["websocket", "polling", "flashsocket"] };
    this._socket = io(domain, this._config);
    //this._socket = null;

    this.domain = domain;
    this._users = [];
  }
  start(name) {
    //this._socket = io(this.domain, this._config);
    this.sendName(name);
    this.listenUsers();
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
    this._socket.emit("u-name", name);
  }

  sendMessage(message) {
    if (!message) {
      return;
    }
    this._socket.emit("send-pub-message", message);
  }

  getSocket() {
    return this._socket;
  }
}

export default Socket;
