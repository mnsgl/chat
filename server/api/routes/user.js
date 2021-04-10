const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");

router.get("/", (req, res) => {
  User.find()
    .exec()
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(400).json({
        error1: "in get all users req",
        error2: err,
      });
    });
});

router.post("/register", (req, res) => {
  User.find({
    $or: [{ mail: req.body.mail }, { name: req.body.name }],
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(400).send();
      }

      const userNew = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        mail: req.body.mail,
        pass: req.body.pass,
      });
      userNew
        .save()
        .then(() => {
          return res.status(201).send();
        })
        .catch((err) => {
          return res.status(404).send();
        });
    });
});

router.get("/login/:name/:pass", (req, res) => {
  let user = { name: req.params.name, pass: req.params.pass };
  User.find(user)
    .exec()
    .then((users) => {
      if (users.length === 0) {
        return res.status(204).send();
      }
      return res.status(200).send({
        user: users[0],
      });
    })
    .catch(() => {
      return res.status(404).send();
    });
});
module.exports = router;
