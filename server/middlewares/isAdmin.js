const { getUser } = require("../services/userMap");

function isAdmin(req,res,next)
{
     const cookie = req.cookies?.UID;
    if(!cookie)
    {
        //console.log("not Allowing")
        return res.json({msg:"adminAccessOnly"});
    }
    
    const user = getUser(cookie);
    if(!user){
        //console.log("not Allowing _")
        return res.json({msg:"adminAccessOnly"});
    }

    const adminEmail = process.env.adminEmail;
    const adminPassword = process.env.adminPassword;
    
    if(user.email === adminEmail && user.pwd === adminPassword)
    next();
    // console.log("Allowing cookie : "+cookie+ " map : "+user)

}

module.exports = isAdmin;