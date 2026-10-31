
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const protect = async (req, res, next) => {
    try {
        let token;

        // Get token from Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // Check token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Token not found",
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find employee
        const employee = await Employee.findById(decoded.id).select("-password");

        if (!employee) {
            return res.status(401).json({
                success: false,
                message: "Employee not found",
            });
        }

        // Attach employee to request
        req.employee = {
            id: employee._id,
            name: employee.name,
            email: employee.email,
            role: employee.role,
        };

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = protect;
