const User = require("../models/User");

const getApprovedCanteens = async (req, res) => {
  try {
    const users = await User.find({
      role: "manager",
      status: "approved",
    }).select("canteenName location");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getApprovedCanteens }; 