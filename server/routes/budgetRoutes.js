const express = require("express");
const router = express.Router();

const {
  setBudget,
  getBudgetStatus,
} = require("../controllers/budgetController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, setBudget);
router.get("/", protect, getBudgetStatus);

module.exports = router;