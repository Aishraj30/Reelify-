const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./src/db/db");

// ✅ Correct route imports (assuming this file is in root of backend)
const userRoutes = require("./src/routes/user.routes");
const itemRoutes = require("./src/routes/item.routes");
const adminRoutes = require("./src/routes/admin.routes");

const app = express();

// ✅ Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local testing
      "https://your-frontend.onrender.com", // replace with your frontend Render link
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Default route to avoid "Cannot GET /"
app.get("/", (req, res) => {
  res.send("🚀 Backend is live and running on Render!");
});

// ✅ Database connection
connectDB();

// ✅ Use Render's provided port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});