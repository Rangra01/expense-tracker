const express = require("express");
const router = express.Router();

const { getAnalytics, getMonthlyData } = require("../controllers/analyticsController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getAnalytics);
router.get("/monthly", protect, getMonthlyData);

module.exports = router;