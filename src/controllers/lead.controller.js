
const Lead = require("../models/Lead");
const mongoose = require("mongoose");

// 1. SUBMIT ENQUIRY
const createLead = async (req, res) => {
    try {
        const { studentName, email, phone, course, message } = req.body;

        // Validate required fields
        if (!studentName || !email || !phone || !course) {
            return res.status(400).json({
                success: false,
                message: "Student name, email, phone and course are required",
            });
        }

        // Create new lead
        const lead = await Lead.create({
            studentName,
            email,
            phone,
            course,
            message,
        });

        return res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            lead,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// 2. GET ALL unclaimed PUBLIC LEADS
const getPublicLeads = async (req, res) => {
    try {
        const leads = await Lead.find({
            claimedBy: null,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: leads.length,
            leads,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// 3. CLAIM A LEAD
const claimLead = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid lead ID",
            });
        }

        const lead = await Lead.findOneAndUpdate(
            {
                _id: id,
                claimedBy: null,
            },
            {
                $set: {
                    claimedBy: req.employee.id,
                    claimedAt: new Date(),
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!lead) {
            return res.status(409).json({
                success: false,
                message: "Lead is already claimed or does not exist",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Lead claimed successfully",
            lead,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// 4. GET MY CLAIMED LEADS
const getMyLeads = async (req, res) => {
    try {
        const leads = await Lead.find({
            claimedBy: req.employee.id,
        }).sort({ claimedAt: -1 });

        return res.status(200).json({
            success: true,
            count: leads.length,
            leads,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    createLead,
    getPublicLeads,
    claimLead,
    getMyLeads,
};
