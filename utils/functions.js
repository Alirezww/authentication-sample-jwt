const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateHashString = (string) => {
    const salt = bcrypt.genSaltSync(6);
    return bcrypt.hashSync(string, salt)
}

const compareDataWithHash = (data, hashedString) => {
    return bcrypt.compareSync(data, hashedString)
}

const tokenGenerator = (payload, expiresIn) => {
    const token = jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn });
    return token
}

function jwtTokenVerify (token) {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if(!result?.payload?.username){
        throw {status : 401, message : 'Plz login'}
    } 
    return result
}

module.exports = {
    generateHashString,
    compareDataWithHash,
    tokenGenerator,
    jwtTokenVerify
}