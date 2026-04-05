import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

const AIInsights = () => {
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    insights: [],
  });

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await API.get("/ai");
        setData(res.data);
      } catch (error) {
        console.error("AI error:", error);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 w-full bg-gray-950 min-h-screen text-white">
        <h1 className="text-3xl mb-6">AI Insights 🤖</h1>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 p-5 rounded-xl">
            <h2>Total Income</h2>
            <p className="text-green-400 text-xl">
              ₹{data.totalIncome}
            </p>
          </div>

          <div className="bg-gray-800 p-5 rounded-xl">
            <h2>Total Expense</h2>
            <p className="text-red-400 text-xl">
              ₹{data.totalExpense}
            </p>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gray-800 p-5 rounded-xl">
          <h2 className="mb-4">Smart Insights</h2>

          {data.insights.length === 0 ? (
            <p className="text-gray-400">No insights available</p>
          ) : (
            data.insights.map((insight, index) => (
              <div
                key={index}
                className="mb-3 p-3 bg-gray-700 rounded"
              >
                {insight}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;