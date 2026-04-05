
const dotenv = require("dotenv");

const express = require("express");

const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { protect } = require("./middlewares/authMiddleware");
const transactionRoutes = require("./routes/transactionRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const aiRoutes = require("./routes/aiRoutes");
const budgetRoutes = require("./routes/budgetRoutes");








// routes

dotenv.config();

// connect database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(cookieParser());
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/budgets", budgetRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user,
  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});