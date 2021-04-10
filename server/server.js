const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const userRoutes = require("./api/routes/user");
const cors = require("cors");
const Socket = require("./socket/app");

//

//db connection
mongoose
  .connect("mongodb://localhost:27017/chat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MONGO Connected... ${db.mongoURI}");
  });

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
app.use("/api/user", userRoutes);
mongoose.Promise = global.Promise;

//server
const server = http.createServer(app);
const socket = new Socket(server);
socket.listen();
server.listen(process.env.PORT || 5000);
