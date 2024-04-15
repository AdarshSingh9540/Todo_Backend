const {Router} = require('express');
const userMiddleware = require('../middleware/user');
const { User } = require('../db');
const { isValid } = require('zod');
const router = Router();

router.post('/signup',(req,res)=>{
    const username  = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    })

    res.json({
        msg:"User create successfully"
    })
})


router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password }).exec();
        if (user) {
            res.json({
                msg: "Login successful"
            });
        } else {
            res.status(401).json({
                msg: "User not found or invalid credentials"
            });
        }
    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});

module.exports = router