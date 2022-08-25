const bcrypt = require("bcrypt");

const generateHashString = (string) => {
    const salt = bcrypt.genSaltSync(6);
    return bcrypt.hashSync(string, salt)
}

module.exports = {
    generateHashString
}