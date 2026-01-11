/* Create imports */
const express = require("express");
const router = express.Router();
const logsControllers = require("../controllers/logs");
const { requireAuth } = require("../middleware/authMiddleware");

/* Create routes */
router.get("/", requireAuth, logsControllers.getLogs);
router.post("/", requireAuth, logsControllers.postLog);
router.get("/:id", requireAuth, logsControllers.getLog);
router.put("/:id", requireAuth, logsControllers.editLog);
router.delete("/:id", requireAuth, logsControllers.deleteLog);

/* Create exports */
module.exports = router;
