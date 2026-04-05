import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8b5cf6", "#22c55e", "#ef4444", "#3b82f6", "#f59e0b"];

const Dashboard = () => {
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    categories: {},
  });

  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/analytics");
        setData(res.data);

        const monthlyRes = await API.get("/analytics/monthly");
        setMonthly(monthlyRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // 👉 Convert category object to array
  const pieData = Object.keys(data.categories || {}).map((key) => ({
    name: key,
    value: data.categories[key],
  }));

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64 p-6">
        <div className="max-w-6xl mx-auto">

          {/* TITLE */}
          <h1 className="text-3xl mb-6 font-semibold">Dashboard</h1>

          {/* CARDS */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="glass p-5 rounded-xl">
              <h2>Total Income</h2>
              <p className="text-green-400 text-xl">
                ₹{data.totalIncome}
              </p>
            </div>

            <div className="glass p-5 rounded-xl">
              <h2>Total Expense</h2>
              <p className="text-red-400 text-xl">
                ₹{data.totalExpense}
              </p>
            </div>

            <div className="glass p-5 rounded-xl">
              <h2>Balance</h2>
              <p className="text-blue-400 text-xl">
                ₹{data.balance}
              </p>
            </div>
          </div>

          {/* CHARTS */}
<div className="grid grid-cols-2 gap-6">

  {/* PIE CHART */}
  <div className="glass p-5 rounded-xl">
    <h2 className="mb-4">Category Breakdown</h2>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {pieData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>

    {/* LEGEND */}
    <div className="mt-4 flex flex-wrap gap-4">
      {pieData.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{
              backgroundColor: COLORS[index % COLORS.length],
            }}
          ></div>
          <span className="text-sm text-gray-300">
            {entry.name}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* BAR CHART */}
  <div className="glass p-5 rounded-xl">
    <h2 className="mb-4">Monthly Trend</h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthly}>
        <CartesianGrid strokeDasharray="3 3" />

        {/* Convert month number to name */}
        <XAxis
          dataKey="_id"
          tickFormatter={(month) => {
            const months = [
              "Jan", "Feb", "Mar", "Apr",
              "May", "Jun", "Jul", "Aug",
              "Sep", "Oct", "Nov", "Dec"
            ];
            return months[month - 1];
          }}
        />

        <YAxis />
        <Tooltip />

        <Bar
          dataKey="total"
          fill="#8b5cf6"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    
    
              </ResponsiveContainer>
            </div>

            {/* BAR CHART */}
            <div className="glass p-5 rounded-xl">
              <h2 className="mb-4">Monthly Trend</h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;