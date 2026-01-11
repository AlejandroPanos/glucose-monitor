/* Create imports */
const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin");
const { requireAuth } = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/adminMiddleware");

/* Create routes */
router.get("/users", requireAuth, checkAdmin, adminControllers.getUsers);
router.delete("/users/:id", requireAuth, checkAdmin, adminControllers.deleteUser);

/* Create exports */
module.exports = router;
