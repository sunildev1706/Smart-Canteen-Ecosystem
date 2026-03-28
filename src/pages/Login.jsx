import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );

      // ✅ Store only what backend sends
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("canteenId", res.data.canteenId);


      // ✅ Role-based navigation
      if (res.data.role === "customer") {
        navigate("/canteen-list");
      } else if (res.data.role === "manager") {
        navigate("/manager-dashboard");
      } else if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="font-serif min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 py-6 rounded-2xl shadow-lg w-96">

        <h2 className="text-2xl text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-violet-200"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-200"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="flex justify-end mb-2">
          <Link
            to="/forgot-password"
            className="text-sm text-violet-500 hover:text-violet-700"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-violet-500 text-white py-3 rounded-lg hover:bg-violet-600"
        >
          Login
        </button>

        <p className="py-3 text-center">
          New User?{" "}
          <Link
            to="/user/signup"
            className="text-violet-500 hover:text-violet-700"
          >
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;