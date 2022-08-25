const { UserModel } = require("../models/User");
const { jwtTokenVerify } = require("../utils/functions");

const checkLogin = async(req, res, next) => {
    try{
        let authError = {status : 401, message : 'Plz login'};

        const authorization = req?.headers?.authorization
        if(!authorization) throw authError;

        let token = authorization.split(" ")?.[1];
        if(!token) throw authError;

        const reuslt = jwtTokenVerify(token);
        const { payload } = reuslt
        const user = await UserModel.findOne({ username : payload.username }, { password : 0 });
        if(!user){
            console.log("hereee")
            throw authError;
        } 

        req.user = user
        next()
    }catch(err){
        next(err)
    }
}

module.exports = {
    checkLogin
}