const { Router } = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db');
const jwt = require('jsonwebtoken');

const router = Router();

// Generate JWT token
function generateToken(userId) {
    return jwt.sign({ userId }, '1234', { expiresIn: '1h' });
}

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;

        // Check if email is already registered
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            firstname,
            lastname
        });
        await newUser.save();

        return res.json({ msg: "User created successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

// Signin Route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        return res.json({ msg: "Login successful", token });
    } catch (error) {
        console.error("Error during signin:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
