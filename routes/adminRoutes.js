const express = require("express");
const router = express.Router();

const {
  getPendingManagers,
  approveManager,
  rejectManager
} = require("../controllers/adminController");


router.get("/pending", getPendingManagers);


router.put("/approve/:id", approveManager);


router.put("/reject/:id", rejectManager);

module.exports = router;