import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      // store token
      localStorage.setItem("token", res.data.accessToken);

      // redirect
      navigate("/");
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl w-96 shadow-lg"
      >
        <h2 className="text-2xl mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-700"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 p-3 rounded hover:bg-purple-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;


