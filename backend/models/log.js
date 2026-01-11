/* Create imports */
const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Create Schema */
const logSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["before_meal", "after_meal", "fasting", "bedtime", "random"],
      required: [true, "Type is required"],
    },
    glucoseLevel: {
      type: Number,
      min: [20, "Glucose value not valid"],
      max: [600, "Glucose level not valid"],
      required: [true, "Glucose level is required"],
    },
    notes: {
      type: String,
      maxlength: [500, "Notes can't be longer than 500 characters"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: () => Date.now(),
    },
    mealId: {
      type: mongoose.Types.ObjectId,
      ref: "Meal",
      default: null,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

/* Create methods */

/* Create exports */
module.exports = mongoose.model("Log", logSchema);
