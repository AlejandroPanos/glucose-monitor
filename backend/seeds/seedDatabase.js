/* Create .env config */
require("dotenv").config();

/* Create imports */
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const csv = require("csv-parser");
const User = require("../models/user");
const Meal = require("../models/meal");
const Log = require("../models/log");
const uri = process.env.MONGOOSE_URI;

/* Create helper function */
const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};

/* Create seed */
const seedDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongodb");
    await User.deleteMany({});
    await Meal.deleteMany({});
    await Log.deleteMany({});

    // Create users
    const usersData = await readCSV(path.join(__dirname, "..", "data", "users.csv"));
    const userMap = {};

    for (const userData of usersData) {
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        age: parseInt(userData.age),
        diabetesType: userData.diabetesType,
        targetGlucose: {
          min: parseInt(userData.targetMin),
          max: parseInt(userData.targetMax),
        },
        role: userData.role,
      });
      userMap[userData.email] = user._id;
    }
    console.log("Users data -->", usersData);

    // Create meals
    const mealsData = await readCSV(path.join(__dirname, "..", "data", "meals.csv"));
    const mealMap = {};

    for (const mealData of mealsData) {
      const userId = userMap[mealData.userEmail];
      if (!userId) continue;

      const meal = await Meal.create({
        name: mealData.name,
        category: mealData.category,
        carbsPerServing: parseFloat(mealData.carbsPerServing),
        servingSize: mealData.servingSize,
        userId,
      });
      const key = `${mealData.userEmail}|${mealData.name}`;
      mealMap[key] = meal._id;
    }
    console.log("Meals data -->", mealsData);

    // Create logs
    const logsData = await readCSV(path.join(__dirname, "..", "data", "logs.csv"));

    for (const logData of logsData) {
      const userId = userMap[logData.userEmail];
      if (!userId) continue;

      let mealId = null;
      if (logData.mealName && logData.mealName.trim() !== "") {
        const key = `${logData.userEmail}|${logData.mealName}`;
        mealId = mealMap[key];
      }

      await Log.create({
        userId,
        type: logData.type,
        glucoseLevel: parseInt(logData.glucoseLevel),
        mealId,
        notes: logData.notes || "",
        date: new Date(logData.date),
      });
    }
    console.log("Logs data -->", logsData);

    // End process
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
seedDatabase();
