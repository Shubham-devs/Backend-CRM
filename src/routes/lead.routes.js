const router = require("express").Router();

const {
    createLead,
    getPublicLeads,
    claimLead,
    getMyLeads,
} = require("../controllers/lead.controller");

const protect = require("../middleware/auth.middleware");

// Student submits enquiry 
router.post("/public", createLead);

// Get all unclaimed enquiries (Protected API)
router.get("/public", protect, getPublicLeads);

// Claim an enquiry (Protected API)
router.patch("/claim/:id", protect, claimLead);

// Get claim counselor's enquiries (Protected API)
router.get("/mine", protect, getMyLeads);

module.exports = router;
