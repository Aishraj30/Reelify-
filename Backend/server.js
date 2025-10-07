const express = require("express");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./src/db/db");

// Routes
const userRoutes = require("./src/routes/user.routes");
const itemRoutes = require("./src/routes/item.routes");
const adminRoutes = require("./src/routes/admin.routes");

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/admin", adminRoutes);

// Serve frontend
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Connect DB
connectDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
