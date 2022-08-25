const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username : { type : String, required : true, trim : true, unique : true },
    email : { type : String, required : true, trim : true, unique : true },
    password : { type : String, required : true, trim : true, min : 8, max : 19 },
    token : { type : String, default : "" }
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = {
    UserModel
}