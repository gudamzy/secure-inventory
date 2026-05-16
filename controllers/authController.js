const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// REGISTER USER
exports.register = async (req, res) => {

    // check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        // check if user exists (prevent duplicate)
        const [existingUser] = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password (IMPORTANT SECURITY REQUIREMENT)
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert user safely (parameterized query = injection safe)
        await db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );

        res.json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};