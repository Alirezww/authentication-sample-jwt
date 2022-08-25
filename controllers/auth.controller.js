const { UserModel } = require("../models/User");
const { generateHashString, compareDataWithHash, tokenGenerator } = require("../utils/functions");

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

    async login(req, res, next){
        try{
            const { username, password } = req.body;

            const user = await UserModel.findOne({ username });
            if(!user) throw {status : 401, message : 'username or password is incorrect...'};

            const isMatchPassword = compareDataWithHash(password, user.password);
            if(!isMatchPassword) throw {status : 401, message : 'username or password is incorrect...'};

            const token = tokenGenerator({ username }, "6 days");

            user.token = token;
            user.save()

            return res.status(200).json({
                status : 200,
                success : true,
                message : 'You have been logged in successfully!!',
                token
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports = {
    AuthController : new AuthController()
}