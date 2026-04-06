import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await API.get("/transactions");
    setTransactions(res.data);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />

      <div className="flex-1 md:ml-64 p-4 md:p-6">
        <h1 className="text-2xl mb-6">Transactions</h1>

        <div className="glass p-4 rounded-xl">
          {transactions.length === 0 ? (
            <p>No transactions yet</p>
          ) : (
            transactions.map((t) => (
              <div key={t._id} className="border-b py-2 flex justify-between">
                <span>{t.category}</span>
                <span className={t.type === "income" ? "text-green-400" : "text-red-400"}>
                  ₹{t.amount}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;