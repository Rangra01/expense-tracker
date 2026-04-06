import { useEffect, useState } from "react";
import API from "../api/api";
import MainLayout from "../layouts/MainLayout";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, ResponsiveContainer
} from "recharts";

const COLORS = ["#4ade80","#f87171","#60a5fa","#c084fc","#facc15"];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [insight, setInsight] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const a = await API.get("/analytics");
      const m = await API.get("/analytics/monthly");
      const ai = await API.get("/ai/insights");

      setData(a.data);
      setMonthly(m.data);
      setInsight(ai.data.insight);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <p className="text-white p-5">Loading...</p>;

  const pieData = Object.entries(data.categories || {}).map(([k,v])=>({
    name:k,value:v
  }));

  return (
    <MainLayout>

      <h1 className="text-2xl mb-6">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-4 rounded-xl text-green-400">₹{data.totalIncome}</div>
        <div className="glass p-4 rounded-xl text-red-400">₹{data.totalExpense}</div>
        <div className="glass p-4 rounded-xl text-blue-400">₹{data.balance}</div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        <div className="glass p-4 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value">
                {pieData.map((e,i)=>(
                  <Cell key={i} fill={COLORS[i%COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-4 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="_id"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="total" fill="#8b5cf6"/>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* AI */}
      <div className="glass p-4 mt-6 rounded-xl">
        🤖 {insight}
      </div>

    </MainLayout>
  );
};

export default Dashboard;