const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running...");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/counter", require("./routes/counterRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/canteens",require("./routes/canteenRoutes"));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});