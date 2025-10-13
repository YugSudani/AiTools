const { getUser } = require("../services/userMap");

function isLogin(req,res,next)
{
    const cookie = req.cookies?.UID;
    if(!cookie)
    {
        //console.log("not Allowing")
        return res.json({msg:"notLogin"});
    }
    
    const user = getUser(cookie);
    if(!user){
        //console.log("not Allowing _")
        return res.json({msg:"notLogin"});
    }

    //console.log("Allowing cookie : "+cookie+ " map : "+user)
    next();

}

module.exports = isLogin;