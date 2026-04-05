const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

// ==============================
// 📊 DASHBOARD ANALYTICS
// ==============================

exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user;

    const transactions = await Transaction.find({ user: userId });

    let totalIncome = 0;
    let totalExpense = 0;

    const categoryMap = {};

    transactions.forEach((t) => {
      if (t.type === "income") {
        totalIncome += t.amount;
      } else {
        totalExpense += t.amount;
      }

      // category breakdown
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = 0;
      }

      categoryMap[t.category] += t.amount;
    });

    const balance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      balance,
      categories: categoryMap,
      transactionsCount: transactions.length,
    });
  } catch (error) {
    console.error("ANALYTICS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// 📈 MONTHLY DATA (FOR CHARTS)
// ==============================

exports.getMonthlyData = async (req, res) => {
  try {
    const userId = req.user;

    const data = await Transaction.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    res.json(data);
  } catch (error) {
    console.error("MONTHLY ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};