import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function MenuPage() {
  const [items, setItems] = useState([]);
  const canteenId = localStorage.getItem("canteenId");

  // ✅ ADD TO CART
  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((i) => i._id === item._id);

    if (existing) {
      cart = cart.map((i) =>
        i._id === item._id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  // ✅ FETCH MENU
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        if (!canteenId) {
          console.log("No canteenId found");
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/menu/${canteenId}`
        );

        if (!Array.isArray(res.data)) return;

        const available = res.data.filter((item) => item.available);
        setItems(available);

      } catch (err) {
        console.log("ERROR:", err);
      }
    };

    fetchMenu();
  }, [canteenId]);

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="relative flex items-center mb-6">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-violet-600">
          Menu
        </h1>

        <div className="ml-auto">
          <Link
            to="/cart"
            className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded"
          >
            <FaShoppingCart />
            Cart
          </Link>
        </div>
      </div>

      {/* MENU GRID */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 font-serif">
        {items.map((item) => (
          <div key={item._id} className="bg-white p-3 rounded shadow">

            <img
              src={item.image || "https://via.placeholder.com/150"}
              alt={item.name}
              className="w-full h-28 object-cover rounded"
            />

            <h2 className="text-lg font-semibold mt-2">
              {item.name}
            </h2>

            <p className="text-lg font-serif mt-2">₹ {item.price}</p>

            <p className="text-sm text-gray-600">
              quantity: {item.quantity}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="mt-2 bg-violet-500 text-white w-full py-1 rounded"
            >
              Add
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;