const Transaction = require("../models/Transaction");

// ➕ ADD TRANSACTION
exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, category, notes, date, tags } = req.body;

    const transaction = await Transaction.create({
      user: req.user,
      type,
      amount,
      category,
      notes,
      date,
      tags,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 GET ALL TRANSACTIONS
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ DELETE TRANSACTION
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};