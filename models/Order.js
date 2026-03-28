const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  counterNumber: {
    type: String,
    required: true
  },

  pin: {
    type: String,
    required: true
  },

  canteenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Counter", counterSchema);