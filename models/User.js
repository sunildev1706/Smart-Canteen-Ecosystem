const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  role: {
    type: String,
    enum: ["admin", "manager", "customer"],
    default: "customer"
  },

  canteenName: String,
  location: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: function () {
      return this.role === "customer" ? "approved" : "pending";
    }
  },

  isApproved: {
    type: Boolean,
    default: function () {
      return this.role === "customer";
    }
  }
});

module.exports = mongoose.model("User", userSchema);