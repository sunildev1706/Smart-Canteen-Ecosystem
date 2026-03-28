const Menu = require("../models/Menu");

// ➕ ADD
const addItem = async (req, res) => {
  try {
    console.log("ADD ITEM:", req.body);

    const item = await Menu.create(req.body);
    res.json(item);

  } catch (err) {
    console.log("ADD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// 📥 GET
const getMenu = async (req, res) => {
  try {
    const { canteenId } = req.params;

    if (!canteenId) {
      return res.status(400).json({ message: "Invalid canteenId" });
    }

    const items = await Menu.find({ canteenId });
    res.json(items);

  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✏️ UPDATE
const updateItem = async (req, res) => {
  try {
    const item = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(item);
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ❌ DELETE
const deleteItem = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addItem, getMenu, updateItem, deleteItem };