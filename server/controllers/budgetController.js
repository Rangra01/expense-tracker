const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");

// ==============================
// ➕ SET / UPDATE BUDGET
// ==============================
exports.setBudget = async (req, res) => {
  try {
    const { category, amount, month, year } = req.body;

    if (!category || !amount || !month || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const budget = await Budget.findOneAndUpdate(
      {
        user: req.user,
        category,
        month,
        year,
      },
      {
        amount,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json(budget);
  } catch (error) {
    console.error("SET BUDGET ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// 📊 GET BUDGET STATUS
// ==============================
exports.getBudgetStatus = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user });

    const result = [];

    for (let b of budgets) {
      // calculate total spent for this category
      const spentData = await Transaction.aggregate([
        {
          $match: {
            user: req.user, // ✅ FIXED (NO ObjectId conversion)
            category: b.category,
            type: "expense",
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);

      const totalSpent = spentData.length > 0 ? spentData[0].total : 0;

      result.push({
        category: b.category,
        budget: b.amount,
        spent: totalSpent,
        remaining: b.amount - totalSpent,
        status:
          totalSpent > b.amount
            ? "exceeded"
            : totalSpent === b.amount
            ? "limit reached"
            : "within budget",
      });
    }

    res.json(result);
  } catch (error) {
    console.error("GET BUDGET ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};