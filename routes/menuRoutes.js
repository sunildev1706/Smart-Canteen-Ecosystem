const express = require("express");
const router = express.Router();

const {
  addItem,
  getMenu,
  updateItem,
  deleteItem
} = require("../controllers/menuController");

router.post("/", addItem);
router.get("/:canteenId", getMenu);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;