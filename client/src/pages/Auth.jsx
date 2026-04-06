import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));

       if (localStorage.getItem("token")) {
  window.location.href = "/";
}
      } else {
        await API.post("/auth/register", form);
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[900px] h-[500px] flex rounded-xl overflow-hidden shadow-2xl">

        {/* LEFT SIDE */}
        <div className="w-1/2 bg-gradient-to-br from-pink-500 to-purple-600 flex flex-col justify-center items-center text-white p-8">
          <h2 className="text-3xl font-bold mb-4">
            {isLogin ? "Welcome Back!" : "Join Us"}
          </h2>

          <p className="mb-6 text-center">
            {isLogin
              ? "Login to manage your finances"
              : "Create your account to start tracking"}
          </p>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="border px-6 py-2 rounded hover:bg-white hover:text-black transition"
          >
            {isLogin ? "SIGN UP" : "LOGIN"}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 bg-white flex flex-col justify-center p-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {isLogin ? "LOGIN" : "SIGN UP"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {!isLogin && (
              <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                className="p-3 border rounded bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="p-3 border rounded bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="p-3 border rounded bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button className="bg-pink-500 text-white p-3 rounded hover:bg-pink-600 transition">
              {isLogin ? "LOGIN" : "SIGN UP"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Auth;