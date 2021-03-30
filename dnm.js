const io = require("socket.io-client");
let socket = io("http://localhost:5000");

socket.emit("u-name", "ben");

socket.on("get-users", (users) => {
  console.log(JSON.parse(users));
});
