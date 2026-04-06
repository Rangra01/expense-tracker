import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const linkClass = (path) =>
    `block p-2 rounded ${
      location.pathname === path
        ? "bg-purple-600"
        : "hover:bg-white/10"
    }`;

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 p-2 rounded"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 glass p-6 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform`}
      >
        <h1 className="text-xl mb-8 text-purple-400">Expense Tracker</h1>

        <nav className="flex flex-col gap-3">
          <Link to="/" className={linkClass("/")}>Dashboard</Link>
          <Link to="/transactions" className={linkClass("/transactions")}>Transactions</Link>
          <Link to="/ai" className={linkClass("/ai")}>AI Insights</Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;