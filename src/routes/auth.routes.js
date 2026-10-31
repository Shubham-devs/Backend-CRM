const router = require("express").Router();

const {
    register,
    login,
} = require("../controllers/auth.controller");

// Employee Registration
router.post("/register", register);

// Employee Login
router.post("/login", login);

module.exports = router;
