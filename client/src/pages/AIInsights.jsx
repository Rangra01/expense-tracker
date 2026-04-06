import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

const AIInsights = () => {
  const [insight, setInsight] = useState("");

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const res = await API.get("/ai/insights");
      setInsight(res.data.insight);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />

      <div className="flex-1 md:ml-64 p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl mb-6">🤖 AI Insights</h1>

        <div className="glass p-6 rounded-xl">
          <p className="text-gray-300">
            {insight || "Analyzing your financial data..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;