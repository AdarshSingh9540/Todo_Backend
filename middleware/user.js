const { User   } = require("../db");

function userMiddleware(req,res,next){
    const { email, password, firstname, lastname } = req.body;

    User.findOne({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password
    })

    .then(function(val){
        if(val){
            next();
        }else{
            res.status(403).json({
                msg:"user donesnot exist"
            })
        }
    })
}

module.exports = userMiddleware;