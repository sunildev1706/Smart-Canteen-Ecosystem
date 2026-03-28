const User = require("../models/User");
const bcrypt = require("bcryptjs");

// SIGNUP
const signup = async (req, res) => {
  try {
    const { name, email, password, role, canteenName, location } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      role,
      canteenName,
      location
    });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ message: "Invalid password" });

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login };