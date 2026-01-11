/* Create imports */
const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const { requireAuth } = require("../middleware/authMiddleware");

/* Create routes */
router.post("/register", authControllers.postRegister);
router.post("/login", authControllers.postLogin);
router.post("/logout", requireAuth, authControllers.postLogout);
router.get("/profile", requireAuth, authControllers.getProfile);
router.post("/profile", requireAuth, authControllers.postProfile);

/* Create exports */
module.exports = router;
