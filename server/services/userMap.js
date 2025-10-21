const jwt = require('jsonwebtoken');
const secret = process.env.jwtSecretKey;

function setUser(user){        // will create and return JWT using secret key
    return jwt.sign({
          _id:user._id,    //payload
          email:user.email
        },
      secret ,
      {expiresIn:'7d'}              // key
    )
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,secret); // it will return decoded payload

    } catch (error) {
        return null;        
    }
}

module.exports = {
    setUser,
    getUser
}