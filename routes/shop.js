const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");
const User = require("../models/User");

router.get("/list", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.send(user.shoppinglist);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

router.post("/add", auth, async (req, res) => {
  const item = req.body.item;
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    user.shoppinglist.push(item);
    user.save();
    res.send(user.shoppinglist);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

router.delete("/delete", auth, async (req, res) => {
  const item = req.body.item;
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    const index = user.shoppinglist.indexOf(item);
    if (index > -1) {
      user.shoppinglist.splice(index);
    }

    user.save();
    res.send(user.shoppinglist);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;
