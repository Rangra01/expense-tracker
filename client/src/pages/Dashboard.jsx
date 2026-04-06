import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/analytics");
      setData(res.data);
    } catch (err) {
      console.error("DASHBOARD ERROR:", err);
      setError("Failed to load data. Backend may be sleeping.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />

      <div className="flex-1 md:ml-64 p-4 md:p-6">

        <h1 className="text-2xl mb-6">Dashboard</h1>

        {/* LOADING */}
        {loading && <p>Loading... please wait</p>}

        {/* ERROR */}
        {error && <p className="text-red-400">{error}</p>}

        {/* DATA */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass p-4 rounded-xl">
              <p>Total Income</p>
              <h2 className="text-green-400">₹{data.totalIncome}</h2>
            </div>

            <div className="glass p-4 rounded-xl">
              <p>Total Expense</p>
              <h2 className="text-red-400">₹{data.totalExpense}</h2>
            </div>

            <div className="glass p-4 rounded-xl">
              <p>Balance</p>
              <h2 className="text-blue-400">₹{data.balance}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;