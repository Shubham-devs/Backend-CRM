const router = require("express").Router();
// Import Routes
const authRoutes = require("./auth.routes");
const leadRoutes = require("./lead.routes");

// API Routes
router.use("/auth", authRoutes);
router.use("/leads", leadRoutes);

module.exports = router;