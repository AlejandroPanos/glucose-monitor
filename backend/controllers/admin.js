/* Create imports */
const User = require("../models/user");
const Log = require("../models/log");
const Meal = require("../models/meal");

/* Create and export controllers */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ role: 1 });
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    await user.deleteOne();
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
