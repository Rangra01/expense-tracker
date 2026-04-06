import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, ResponsiveContainer
} from "recharts";

const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#c084fc", "#facc15"];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [insight, setInsight] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/analytics");
      setData(res.data);

      const monthRes = await API.get("/analytics/monthly");
      setMonthly(monthRes.data);

      const aiRes = await API.get("/ai/insights");
      setInsight(aiRes.data.insight);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <p className="text-white p-5">Loading...</p>;

  const pieData = Object.entries(data.categories || {}).map(([k, v]) => ({
    name: k,
    value: v,
  }));

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />

      <div className="flex-1 md:ml-64 p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl mb-6">Dashboard</h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass p-4 rounded-xl">
            <p>Total Income</p>
            <h2 className="text-green-400 text-xl">₹{data.totalIncome}</h2>
          </div>

          <div className="glass p-4 rounded-xl">
            <p>Total Expense</p>
            <h2 className="text-red-400 text-xl">₹{data.totalExpense}</h2>
          </div>

          <div className="glass p-4 rounded-xl">
            <p>Balance</p>
            <h2 className="text-blue-400 text-xl">₹{data.balance}</h2>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          <div className="glass p-4 rounded-xl">
            <h2 className="mb-4">Category Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" label>
                  {pieData.map((e, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="glass p-4 rounded-xl">
            <h2 className="mb-4">Monthly Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="_id"
                  tickFormatter={(m) =>
                    ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m-1]
                  }
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* AI INSIGHTS */}
        <div className="glass p-5 rounded-xl mt-6">
          <h2 className="mb-3">🤖 AI Insights</h2>
          <p className="text-gray-300">
            {insight || "Analyzing your data..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;