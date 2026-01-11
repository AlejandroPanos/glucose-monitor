/* Create imports */
const express = require("express");
const router = express.Router();
const mealsControllers = require("../controllers/meals");
const { requireAuth } = require("../middleware/authMiddleware");

/* Create routes */
router.get("/", requireAuth, mealsControllers.getMeals);
router.post("/", requireAuth, mealsControllers.postMeal);
router.get("/:id", requireAuth, mealsControllers.getMeal);
router.put("/:id", requireAuth, mealsControllers.editMeal);
router.delete("/:id", requireAuth, mealsControllers.deleteMeal);

/* Create exports */
module.exports = router;
