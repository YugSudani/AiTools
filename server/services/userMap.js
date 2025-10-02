const userMap = new Map();

function setUser(uid,user){
    userMap.set(uid,user);
}

function getUser(uid){
    return userMap.get(uid)
}

module.exports = {
    setUser,
    getUser
}