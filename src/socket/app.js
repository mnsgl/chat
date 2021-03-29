import { io } from "socket.io-client";

class Socket {
  constructor() {
    this.socket = null;
  }
  start() {
    this.socket = io();
  }

  sendName(name) {
    if (this.socket === null) {
      this.start();
    }
    this.socket.emit("u-name", name);
  }
}

export default Socket;
