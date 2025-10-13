const jwt = require('jsonwebtoken');
const secret = process.env.jwtSecretKey;

function setUser(user){        // will create and return JWT using secret key
    return jwt.sign({
        _id:user._id,
        email:user.email
    },
       secret
    )
}

function getUser(uid){
    if(!uid) return null;
    try {
        return jwt.verify(uid,secret);

    } catch (error) {
        return null;        
    }
}

module.exports = {
    setUser,
    getUser
}