const Transaction = require("../models/Transaction");
const { generateInsights } = require("../services/aiService");

exports.getAIInsights = async (req, res) => {
  try {
    const userId = req.user;

    const transactions = await Transaction.find({ user: userId });

    let totalIncome = 0;
    let totalExpense = 0;
    const categories = {};

    transactions.forEach((t) => {
      if (t.type === "income") totalIncome += t.amount;
      else totalExpense += t.amount;

      if (!categories[t.category]) categories[t.category] = 0;
      categories[t.category] += t.amount;
    });

    const insights = generateInsights({
      totalIncome,
      totalExpense,
      categories,
    });

    res.json({
      totalIncome,
      totalExpense,
      insights,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};