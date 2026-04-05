const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");

const { protect } = require("../middlewares/authMiddleware");

// protected routes
router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
router.delete("/:id", protect, deleteTransaction);
router.put("/:id", protect, updateTransaction);
module.exports = router;