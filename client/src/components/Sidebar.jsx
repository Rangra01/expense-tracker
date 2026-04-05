import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  // 👉 Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen fixed glass p-6 flex flex-col justify-between">
      
      {/* TOP */}
      <div>
        <h1 className="text-xl font-bold mb-8 text-purple-400">
          Expense Tracker
        </h1>

        <nav className="flex flex-col gap-4">
          <Link to="/" className="hover:text-purple-400">
            Dashboard
          </Link>
          <Link to="/transactions" className="hover:text-purple-400">
            Transactions
          </Link>
          <Link to="/ai" className="hover:text-purple-400">
            AI Insights
          </Link>
        </nav>
      </div>

      {/* BOTTOM USER */}
      <div className="glass p-3 rounded-lg">
        <p className="text-sm text-gray-400">Logged in as</p>
        <p className="font-semibold text-purple-300">
          {user?.name || "User"}
        </p>

        <button
          onClick={handleLogout}
          className="mt-3 text-red-400 text-sm hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;