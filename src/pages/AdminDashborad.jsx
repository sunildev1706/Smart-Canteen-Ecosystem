import React, { useEffect, useState } from "react";
import axios from "axios";
import {FaMapMarker,FaUser,FaStore} from "react-icons/fa";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("approval");
  const [pendingCanteens, setPendingCanteens] = useState([]);
  const [complaints,setComplains]=useState([]);

  // 📥 Fetch Pending Managers
  const fetchPending = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/pending");
      setPendingCanteens(res.data);
       console.log("API Response:", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  // ✅ Approve
  const approve = async (id) => {
    await axios.put(`http://localhost:5000/api/admin/approve/${id}`);
    fetchPending();
  };

  // ❌ Reject
  const reject = async (id) => {
    await axios.put(`http://localhost:5000/api/admin/reject/${id}`);
    fetchPending();
  };
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-violet-600 text-white p-4 text-center text-2xl font-bold">
        Admin Dashboard
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setActiveTab("approval")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "approval"
              ? "bg-violet-500 text-white"
              : "bg-white"
          }`}
        >
          Approvals
        </button>

        <button
          onClick={() => setActiveTab("complaints")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "complaints"
              ? "bg-violet-500 text-white"
              : "bg-white"
          }`}
        >
          Complaints
        </button>
      </div>

      {/* Content */}
      <div className="p-6">

        {/* APPROVAL SECTION */}
        {activeTab === "approval" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {pendingCanteens.map((canteen) => (
              <div
                key={canteen._id}
                className="bg-white p-5 rounded-xl shadow"
              >
                 <div className="flex items-center gap-2 text-gray-800">
                    <FaUser className="text-violet-500" />
                    <span>Manager: {canteen.name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-800">
                    <FaStore className="text-orange-950" />
                    <span>Canteen: {canteen.canteenName || "N/A"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <FaMapMarker className="text-blue-500" />
                    <span>Location: {canteen.location || "N/A"}</span>
                </div>

                <div className="flex gap-3 mt-4">
                  <button onClick={()=>approve(canteen._id)} className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600">
                    Approve
                  </button>

                  <button onClick={()=>reject(canteen._id)} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">
                    Reject
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}

        {/* COMPLAINT SECTION */}
        {activeTab === "complaints" && (
          <div className="space-y-4">

            {complaints.map((c) => (
              <div
                key={c.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {c.canteen}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {c.type} Issue
                  </p>
                  <p className="text-sm">{c.message}</p>
                </div>

                <button className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600">
                  Take Action
                </button>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;