const express =require("express");
const router=express.Router();

const { getApprovedCanteens }=require("../controllers/canteenController");

router.get("/approved",getApprovedCanteens);

module.exports =router;