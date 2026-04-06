import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AIInsights from "./pages/AIInsights";
import Auth from "./pages/Auth";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Auth />} />

        {/* PROTECTED */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />

        <Route
          path="/ai"
          element={
            <PrivateRoute>
              <AIInsights />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;