const express = require("express");
const router = express.Router();

const { getAIInsights } = require("../controllers/aiController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getAIInsights);

module.exports = router;