import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CanteenList() {
  const [canteens, setCanteens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/canteens/approved");
        setCanteens(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCanteens();
  }, []);

  // 🔥 FIX: Store canteenId
  const handleViewMenu = (canteen) => {
    localStorage.setItem("canteenId", canteen._id);
    navigate("/menu-items");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-violet-600 mb-6 text-center">
        Available Canteens
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {canteens.map((canteen) => (
          <div key={canteen._id}
            className="bg-white text-center rounded-2xl shadow-md p-4">

            <h2 className="text-xl text-violet-600">
              {canteen.canteenName}
            </h2>

            <p>{canteen.location}</p>

            <button
              onClick={() => handleViewMenu(canteen)}
              className="mt-3 bg-violet-600 text-white px-4 py-2 rounded"
            >
              View Menu
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default CanteenList;