import { io } from "socket.io-client";

class Socket {
  constructor(domain, config) {
    this.socket = null;
    this.domain = domain;
    this.config = config;
    this._users = [];
  }
  start(name) {
    this.socket = io(this.domain, this.config);
    this.sendName(name);
    this.listenUsers();
  }

  listenUsers() {
    this.socket.on("get-users", (users) => {
      this._users = JSON.parse(users);
    });
  }

  getUsers() {
    return this._users;
  }

  sendName(name) {
    this.socket.emit("u-name", name);
  }

  sendMessage(message) {
    if (message) {
      return;
    }
    this.socket.emit("send-pub-message", message);
  }
}

export default Socket;
