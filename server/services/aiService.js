// ⚠️ For now we simulate AI (FREE method)

exports.generateInsights = (data) => {
  const { totalIncome, totalExpense, categories } = data;

  let insights = [];

  // savings
  const savings = totalIncome - totalExpense;

  // top category
  let topCategory = "";
  let max = 0;

  for (let cat in categories) {
    if (categories[cat] > max) {
      max = categories[cat];
      topCategory = cat;
    }
  }

  // rules-based AI (smart logic)
  if (totalExpense > totalIncome) {
    insights.push("⚠️ You are spending more than you earn.");
  }

  if (savings > 0) {
    insights.push(`✅ You saved ₹${savings} this period.`);
  }

  if (topCategory) {
    insights.push(`📊 Your highest spending is on ${topCategory}.`);
  }

  if (categories[topCategory] > totalIncome * 0.4) {
    insights.push(`⚠️ High spending on ${topCategory}. Consider reducing it.`);
  }

  return insights;
};