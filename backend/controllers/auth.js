/* Create imports */
const User = require("../models/user");
const Log = require("../models/log");
const Meal = require("../models/meal");
const { createToken, maxAge } = require("../helpers/helpers");
const jwt = require("jsonwebtoken");

/* Create and export controllers */
exports.postRegister = async (req, res) => {
  const { name, email, password, age, diabetesType, targetGlucose } = req.body;
  try {
    const user = await User.register(name, email, password, age, diabetesType, targetGlucose);

    // Create token and cookie
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge, httpOnly: true });
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // Create token and cookie
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge, httpOnly: true });
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.postLogout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1, httpOnly: true });
    res.status(200).json({ msg: "User logout" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.postProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const user = await User.updateProfile(userId, updates);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
