const { Users, User } = require("../models");
const { populate } = require("../models/User");

const userController = {
  getAllUsers(req, res) {
    // GET all users
    Users.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.json(400).json(err);
      });
  },
  // GET user by id
  getUserById({ params }, res) {
    Users.findOne({ _id: params.id });
    populate({
      path: "thoughts",
      select: "-__v",
    })
      .select("-__v")
      .then((dbUserData) => {
        // if no user is found send 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.status(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.json(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(400).json(err));
  },
};

module.exports = userController;
