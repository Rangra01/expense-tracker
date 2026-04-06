import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const linkClass = (path) =>
    `p-2 rounded ${
      location.pathname === path
        ? "bg-purple-600 text-white"
        : "text-gray-300 hover:bg-white/10"
    }`;

  return (
    <div className="hidden md:flex flex-col justify-between w-64 h-screen fixed glass p-6">

      {/* TOP */}
      <div>
        <h1 className="text-xl font-bold mb-8 text-purple-400">
          Expense Tracker
        </h1>

        <nav className="flex flex-col gap-3">
          <Link to="/" className={linkClass("/")}>
            📊 Dashboard
          </Link>

          <Link to="/transactions" className={linkClass("/transactions")}>
            💸 Transactions
          </Link>

          <Link to="/ai" className={linkClass("/ai")}>
            🤖 AI Insights
          </Link>
        </nav>
      </div>

      {/* BOTTOM USER */}
      <div className="glass p-4 rounded-xl">
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