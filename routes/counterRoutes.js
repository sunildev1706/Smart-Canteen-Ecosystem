const express = require("express");
const router = express.Router();

const {
  addCounter,
  getCounters,
  deleteCounter
} = require("../controllers/counterController");

// ➕ ADD
router.post("/", addCounter);

// 📥 GET
router.get("/:canteenId", getCounters);

// ❌ DELETE
router.delete("/:id", deleteCounter);

module.exports = router;