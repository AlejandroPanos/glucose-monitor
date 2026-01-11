/* Create imports */
const mongoose = require("mongoose");
const User = require("../models/user");
const Log = require("../models/log");
const Meal = require("../models/meal");

/* Create and export controllers */
exports.getLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const logs = await Log.find({ userId })
      .populate("mealId", "name carbsPerServing servingSize")
      .sort({ date: -1 });

    res.status(200).json(logs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.postLog = async (req, res) => {
  const userId = req.user.id;
  const { type, glucoseLevel, notes, date } = req.body;
  try {
    const log = await Log.create({ type, glucoseLevel, notes, date, userId });

    res.status(201).json(log);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getLog = async (req, res) => {
  try {
    const logId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(logId)) {
      return res.status(400).json({ error: "Invalid log ID format" });
    }

    const log = await Log.findById(logId).populate("mealId", "name carbsPerServing servingSize");
    if (!log) {
      return res.status(404).json({ error: "Log not found" });
    }

    if (userId.toString() !== log.userId.toString()) {
      return res.status(403).json({ error: "Access denied: Log belongs to another user" });
    }

    res.status(200).json(log);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.editLog = async (req, res) => {
  try {
    const { type, glucoseLevel, date, mealId, notes } = req.body;
    const logId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(logId)) {
      return res.status(400).json({ error: "Invalid log ID format" });
    }

    const log = await Log.findById(logId);
    if (!log) {
      return res.status(404).json({ error: "Log not found" });
    }

    if (userId.toString() !== log.userId.toString()) {
      return res.status(403).json({ error: "Access denied: Log belongs to another user" });
    }

    if (type) log.type = type;
    if (glucoseLevel !== undefined) log.glucoseLevel = parseInt(glucoseLevel);
    if (date) log.date = new Date(date);
    if (mealId !== undefined) log.mealId = mealId;
    if (notes !== undefined) log.notes = notes;

    await log.save();

    const updatedLog = await Log.findById(logId).populate(
      "mealId",
      "name carbsPerServing servingSize"
    );

    res.status(200).json(updatedLog);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const logId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(logId)) {
      return res.status(400).json({ error: "Invalid log ID format" });
    }

    const log = await Log.findById(logId);
    if (!log) {
      return res.status(404).json({ error: "Log not found" });
    }

    if (userId.toString() !== log.userId.toString()) {
      return res.status(403).json({ error: "Access denied: Log belongs to another user" });
    }

    await log.deleteOne();
    res.status(200).json({ msg: "Log deleted successfully", log });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
