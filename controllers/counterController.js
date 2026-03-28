const Counter = require("../models/Counter");

// ➕ ADD COUNTER
const addCounter = async (req, res) => {
  try {
    const counter = await Counter.create(req.body);
    res.json(counter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📥 GET COUNTERS
const getCounters = async (req, res) => {
  try {
    const counters = await Counter.find({
      canteenId: req.params.canteenId
    });
    res.json(counters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ DELETE COUNTER
const deleteCounter = async (req, res) => {
  try {
    await Counter.findByIdAndDelete(req.params.id);
    res.json({ message: "Counter Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addCounter, getCounters, deleteCounter };