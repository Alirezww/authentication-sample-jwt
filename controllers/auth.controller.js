const { UserModel } = require("../models/User");
const { generateHashString } = require("../utils/functions");

class AuthController {
    
    async register(req, res, next){
        try{
            const { username, email, password } = req.body
    
            const hash_password = generateHashString(password);
    
            const user = await UserModel.create({ username, email, password : hash_password })
    
            return res.status(200).json({
                message : "New User created successfully!!",
                status : 200,
                success : true
            })
        }catch(err){
            next(err)
        }
    }

    login(){

    }
}

module.exports = {
    AuthController : new AuthController()
}