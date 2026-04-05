import { useState, useEffect } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import { exportCSV, exportPDF } from "../utils/export";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    notes: "",
  });

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/transactions/${editId}`, form);
        setEditId(null);
      } else {
        await API.post("/transactions", form);
      }

      setForm({
        type: "expense",
        amount: "",
        category: "",
        notes: "",
      });

      fetchTransactions();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (t) => {
    setForm({
      type: t.type,
      amount: t.amount,
      category: t.category,
      notes: t.notes || "",
    });

    setEditId(t._id);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64 p-6">
        <div className="max-w-5xl mx-auto">

          {/* TITLE */}
          <h1 className="text-3xl mb-6 font-semibold">Transactions</h1>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mb-6 flex gap-4 flex-wrap"
          >
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="p-2 bg-gray-800 rounded"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <input
              name="amount"
              value={form.amount}
              placeholder="Amount"
              onChange={handleChange}
              className="p-2 bg-gray-800 rounded"
            />

            <input
              name="category"
              value={form.category}
              placeholder="Category"
              onChange={handleChange}
              className="p-2 bg-gray-800 rounded"
            />

            <button className="bg-purple-600 px-4 py-2 rounded">
              {editId ? "Update" : "Add"}
            </button>
          </form>

          {/* EXPORT BUTTONS */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => exportCSV(transactions)}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Export CSV
            </button>

            <button
              onClick={() => exportPDF(transactions)}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Export PDF
            </button>
          </div>

          {/* LIST */}
          <div className="glass p-4 rounded-xl shadow-lg w-full">
            {transactions.length === 0 ? (
              <p className="text-gray-400">No transactions yet</p>
            ) : (
              transactions.map((t) => (
                <div
                  key={t._id}
                  className="flex justify-between items-center border-b border-gray-700 py-3 hover:bg-white/5 px-2 rounded"
                >
                  <div>
                    <p className="font-semibold">{t.category}</p>
                    <p className="text-sm text-gray-400">{t.type}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="font-bold">₹{t.amount}</p>

                    <button
                      onClick={() => handleEdit(t)}
                      className="text-yellow-400"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(t._id)}
                      className="text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Transactions;