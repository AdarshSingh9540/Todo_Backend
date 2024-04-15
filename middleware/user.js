const { User   } = require("../dbs");

function userMiddleware(req,res,next){
    const { username, password } = req.body
    User.findOne({
        username:username,
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