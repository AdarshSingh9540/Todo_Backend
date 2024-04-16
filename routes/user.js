const {Router} = require('express');
const userMiddleware = require('../middleware/user');
const { User } = require('../db');
const { isValid } = require('zod');
const router = Router();

router.post('/signup',(req,res)=>{
    const email  = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    User.create({
        email,
        password,
        firstname,
        lastname,
       
    })

    res.json({
        msg:"User create successfully"
    })
})


router.post('/signin', async (req, res) => {
    const email= req.body.email;
    const password = req.body.password;

    try {
        const user = await User.find({ email, password }).exec();
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