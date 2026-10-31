
const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: [true, "Student name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },

        course: {
            type: String,
            required: [true, "Course is required"],
            trim: true,
        },

        message: {
            type: String,
            trim: true,
            default: "",
        },

        claimedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            default: null,
        },

        claimedAt: {
            type: Date,
            default: null,
        },

        status: {
            type: String,
            enum: ["new", "contacted", "interested", "converted", "rejected"],
            default: "new",
        },
    },
    {
        timestamps: true,
    }
);

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
