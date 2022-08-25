const { validationResult } = require("express-validator")

const errorValidationMapper = (req, res, next) => {
    let messages = {};
    const result = validationResult(req);

    if(result?.errors?.length > 0){
        result?.errors.forEach(err => {
            messages[err.param] = err.msg
        });

        return res.status(401).json({
            status : 401,
            success : false,
            messages
        })
    }
    next()
}

module.exports = {
    errorValidationMapper
}