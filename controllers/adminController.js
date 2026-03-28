const User = require("../models/User");

// 📥 GET PENDING MANAGERS
const getPendingManagers = async (req, res) => {
  try {
    const users = await User.find({
      role: "manager",
      status: "pending"
    }).select("name canteenName location");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ APPROVE
const approveManager = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
        isApproved: true
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ REJECT
const rejectManager = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // ✅ DELETE

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Manager rejected and deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPendingManagers,
  approveManager,
  rejectManager
};