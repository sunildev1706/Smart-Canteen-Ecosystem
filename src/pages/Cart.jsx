import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function CartPage() {
  const [items, setItems] = useState([]);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(cartData);
  }, []);

  // ➕ Increase Quantity
  const increaseQty = (id) => {
    const updated = items.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ➖ Decrease Quantity
  const decreaseQty = (id) => {
    const updated = items.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ❌ Remove Item
  const removeItem = (id) => {
    const updated = items.filter((item) => item._id !== id);

    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 💰 Total Price
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 🧾 Place Order
  const placeOrder = () => {
    alert("Order Placed Successfully!");
    localStorage.removeItem("cart");
    setItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center text-violet-600 mb-8">
        Ordering Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT - CART ITEMS */}
        <div className="md:col-span-2 space-y-4">

          {items.length === 0 && (
            <p className="text-center text-gray-500">
              Your cart is empty
            </p>
          )}

          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-xl shadow flex items-center justify-between"
            >

              {/* Item Info */}
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  ₹ {item.price}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="px-3 py-1 bg-violet-500 text-white rounded"
                >
                  +
                </button>
              </div>

              {/* Total per item */}
              <div className="ml-4 font-semibold">
                ₹ {item.price * item.quantity}
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item._id)}
                className="ml-4 text-red-500 text-sm"
              >
                Remove
              </button>

            </div>
          ))}
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">

          <h2 className="text-xl font-bold text-violet-600 mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{items.length}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Total Amount</span>
            <span className="font-semibold">₹ {total}</span>
          </div>

          <hr className="my-4" />

          <button
            onClick={placeOrder}
            className="w-full bg-violet-500 text-white py-3 rounded-lg hover:bg-violet-600"
          >
            Place Order
          </button>

          <p className="text-center mt-3">
            <Link
              to="/menu-items"
              className="inline-flex items-center gap-1 text-violet-500"
            >
              Continue Order <FaArrowRight />
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default CartPage;