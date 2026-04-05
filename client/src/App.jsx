import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import Auth from "./pages/Auth";
import Transactions from "./pages/Transactions";
import AIInsights from "./pages/AIInsights";

// 🔐 Private Route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Auth />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Auth />} />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Transactions */}
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
    </BrowserRouter>
  );
}

export default App;