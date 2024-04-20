const { Router } = require('express');
const bcrypt = require('bcrypt');
const { todo, User } = require('../db');

const jwt = require('jsonwebtoken');
const userMiddleware = require('../middleware/user')
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
        // Signin logic
    } catch (error) {
        console.error("Error during signin:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

// Add todo for a user
router.post('/todo', userMiddleware, async (req, res) => {
    const { userId } = req.body; // Assuming userId is sent along with the request

    try {
        // Create a new todo
        const newTodo = await todo.create({
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed || false 
        });

        // Push the new todo's _id into the Todos array of the user
        await User.findByIdAndUpdate(userId, { $push: { Todos: newTodo._id } });

        res.json({
            msg: "Todo created successfully",
            todo: newTodo
        });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});


module.exports = router;
