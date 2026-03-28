import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function ManagerLayout() {
  const location = useLocation();

  const navItems = [
    {name:"Dashboard", path:"/manager-dashboard"},
    { name: "Menu Management", path: "/manager-dashboard/menu" },
    { name: "Counter Management", path: "/manager-dashboard/counter" },
  ];

  // 📊 Dummy Data
  const dailyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Revenue ₹",
        data: [1200, 1500, 1800, 2000, 2500, 3000, 2800],
        backgroundColor: "#8b5cf6"
      }
    ]
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        label: "Monthly Revenue ₹",
        data: [15000, 22000, 18000, 25000, 30000, 27000,19000,29000,12000,43000,54000,24000],
        borderColor: "#8b5cf6",
        backgroundColor: "#8b5cf6",
        tension: 0.4
      }
    ]
  };

  const topFoods = [
    { name: "Dosa", count: 120 },
    { name: "Tea", count: 200 },
    { name: "Biryani", count: 90 }
  ];

  const isDashboard = location.pathname === "/manager-dashboard";

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">

        <h1 className="text-xl font-bold text-violet-600">
          Manager Panel
        </h1>

        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium ${
                location.pathname === item.path
                  ? "text-violet-600 border-b-2 border-violet-600"
                  : "text-gray-600 hover:text-violet-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

      </div>

      <div className="p-6">

        {/* ✅ DASHBOARD */}
        {isDashboard ? (
          <div>

            <h1 className="text-2xl font-bold text-violet-600 mb-6">
              Dashboard
            </h1>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">

              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-gray-500">Orders Today</p>
                <h2 className="text-xl font-bold text-violet-600">145</h2>
              </div>

              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-gray-500">Weekly Orders</p>
                <h2 className="text-xl font-bold text-violet-600">920</h2>
              </div>

              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-gray-500">Today Revenue</p>
                <h2 className="text-xl font-bold text-violet-600">₹12,500</h2>
              </div>

              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-gray-500">Monthly Revenue</p>
                <h2 className="text-xl font-bold text-violet-600">₹2,45,000</h2>
              </div>

            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">

              <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-violet-600 font-semibold mb-2">
                  Daily Revenue
                </h2>
                <Bar data={dailyData} />
              </div>

              <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-violet-600 font-semibold mb-2">
                  Monthly Revenue
                </h2>
                <Line data={monthlyData} />
              </div>

            </div>

            {/* Top Selling */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-violet-600 font-semibold mb-4">
                Top Selling Today
              </h2>

              {topFoods.map((food, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b py-2"
                >
                  <span>{food.name}</span>
                  <span className="text-violet-600 font-semibold">
                    {food.count} orders
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Outlet />
        )}

      </div>
    </div>
  );
}

export default ManagerLayout;