import React, { useState, useEffect } from "react";
import axios from "axios";

function MenuManagement() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    image: ""
  });

  const [menu, setMenu] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const canteenId = localStorage.getItem("canteenId");

  // 📥 Fetch Menu
  const fetchMenu = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/menu/${canteenId}`
    );
    setMenu(res.data);
  };

  useEffect(() => {
    fetchMenu();
  }, [canteenId]);

  // ➕ ADD or UPDATE
  const addOrUpdateItem = async () => {
    if (!form.name || !form.price) return alert("Fill all fields");

    try {
      if (editingId) {
        // ✏️ UPDATE
        await axios.put(
          `http://localhost:5000/api/menu/${editingId}`,
          form
        );
        setEditingId(null);
      } else {
        // ➕ ADD
        await axios.post("http://localhost:5000/api/menu", {
          ...form,
          canteenId
        });
      }

      setForm({ name: "", price: "", quantity: "", image: "" });
      fetchMenu();

    } catch (err) {
      console.log(err);
    }
  };

  // ❌ DELETE
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/menu/${id}`);
    fetchMenu();
  };

  // 🔁 TOGGLE
  const toggleAvailability = async (item) => {
    await axios.put(`http://localhost:5000/api/menu/${item._id}`, {
      available: !item.available
    });
    fetchMenu();
  };

  // ✏️ EDIT
  const editItem = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-violet-600 mb-6">
        Menu Management
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-8 grid md:grid-cols-4 gap-4">

        <input
          placeholder="Item Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price:Number(e.target.value) })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity:Number(e.target.value) })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 rounded"
        />

        <button
          onClick={addOrUpdateItem}
          className="col-span-full bg-violet-500 text-white py-2 rounded"
        >
          {editingId ? "Update Item" : "Add Item"}
        </button>

      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {menu.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-xl shadow">

            <img
              src={item.image || "https://via.placeholder.com/150"}
              alt="food"
              className="w-full h-32 object-cover rounded"
            />

            <h2 className="font-semibold mt-2">{item.name}</h2>
            <p>₹ {item.price}</p>
            <p>Qty: {item.quantity}</p>

            <p className={item.available ? "text-green-500" : "text-red-500"}>
              {item.available ? "Available" : "Unavailable"}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => editItem(item)}
                className="flex-1 bg-blue-500 text-white py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => toggleAvailability(item)}
                className="flex-1 bg-yellow-500 text-white py-1 rounded"
              >
                Availablity
              </button>

              <button
                onClick={() => deleteItem(item._id)}
                className="flex-1 bg-red-500 text-white py-1 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuManagement;