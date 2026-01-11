/* Create imports */
const mongoose = require("mongoose");
const User = require("../models/user");
const Log = require("../models/log");
const Meal = require("../models/meal");

/* Create and export controllers */
exports.getMeals = async (req, res) => {
  try {
    const userId = req.user.id;
    const meals = await Meal.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(meals);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.postMeal = async (req, res) => {
  const userId = req.user.id;
  const { name, category, carbsPerServing, servingSize } = req.body;
  try {
    const meal = await Meal.create({ name, category, carbsPerServing, servingSize, userId });
    res.status(201).json(meal);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getMeal = async (req, res) => {
  try {
    const mealId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(mealId)) {
      return res.status(400).json({ error: "Invalid meal ID format" });
    }

    const meal = await Meal.findById(mealId);
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    if (userId.toString() !== meal.userId.toString()) {
      return res.status(403).json({ error: "Access denied: Meal belongs to another user" });
    }

    res.status(200).json(meal);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.editMeal = async (req, res) => {
  try {
    const { name, category, carbsPerServing, servingSize } = req.body;
    const mealId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(mealId)) {
      return res.status(400).json({ error: "Invalid meal ID format" });
    }

    const meal = await Meal.findById(mealId);
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    if (userId.toString() !== meal.userId.toString()) {
      return res.status(403).json({ error: "Access denied: Meal belongs to another user" });
    }

    const updatedMeal = await Meal.findByIdAndUpdate(
      mealId,
      { name, category, carbsPerServing, servingSize },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedMeal);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    const mealId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(mealId)) {
      return res.status(400).json({ error: "Invalid meal ID format" });
    }

    const meal = await Meal.findById(mealId);
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    if (userId.toString() !== meal.userId.toString()) {
      return res.status(403).json({ error: "Access denied: Meal belongs to another user" });
    }

    await meal.deleteOne();
    res.status(200).json({ msg: "Meal deleted successfully", meal });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
