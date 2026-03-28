import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Customer",
    canteenName: "",
    location: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    let value=e.target.value;
    if(e.target.name==="email"){
      value=value.toLowerCase();
    }
    setForm({ ...form, [e.target.name]:value });
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        role:
          form.role === "Customer"
            ? "customer"
            : form.role === "Canteen Manager"
            ? "manager"
            : "admin",
        canteenName: form.role === "Canteen Manager" ? form.canteenName : "",
        location: form.role === "Canteen Manager" ? form.location : ""
      });

      // ✅ Redirect logic
      if (form.role === "Customer") {
        navigate("/canteen-list");
      } else {
        alert("Wait for admin approval");
        navigate("/user/login");
      }
      console.log("sending",form);
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen font-serif flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[450px]">

        <h2 className="text-2xl text-center mb-6">Signup</h2>

        {/* Role */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-3"
        >
          <option>Customer</option>
          <option>Canteen Manager</option>
          <option>Admin</option>
        </select>

        {/* Name + Email */}
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-1/2 p-3 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-1/2 p-3 border rounded-lg"
          />
        </div>

        {/* Password */}
        <div className="flex gap-3 mb-3">

          <div className="relative w-1/2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative w-1/2">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

        </div>

        {/* Manager Fields */}
        {form.role === "Canteen Manager" && (
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              name="canteenName"
              placeholder="Canteen Name"
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg"
            />
          </div>
        )}

        <button
          onClick={handleSignup}
          className="w-full bg-violet-500 text-white py-3 rounded-lg hover:bg-violet-600"
        >
          Signup
        </button>

        <p className="text-center py-4">
          Already have account?{" "}
          <Link to="/user/login" className="text-violet-500">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;