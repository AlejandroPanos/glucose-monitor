/* Create imports */
const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Create Schema */
const mealSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack", "other"],
      default: "other",
      required: true,
    },
    carbsPerServing: {
      type: Number,
      required: [true, "Carbs amount is required"],
      min: [0, "Carbs can't be lower than 0"],
    },
    servingSize: {
      type: String,
      default: "100g",
      required: [true, "Serving size is required"],
      trim: true,
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
module.exports = mongoose.model("Meal", mealSchema);
