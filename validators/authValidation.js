const { body } = require("express-validator");
const { UserModel } = require("../models/User");

const registerValidator = () => {
    return [
        body("username")
            .notEmpty()
            .withMessage("username field should not be empty...")

            .custom(async(username) => {
                const user = await UserModel.findOne({ username });
                if(user) throw "username is common...";
                return true
            }),

        body("email")
            .notEmpty()
            .withMessage("email field should not be empty")

            .isEmail()
            .withMessage("email is not valid...")

            .custom(async(email) => {
                const user = await UserModel.findOne({ email });
                if(user) throw "email is common...";
                return true
            }),

        body("password")
            .notEmpty()
            .withMessage("password field should not be empty")

            .isLength({ min : 8, max : 19 })
            .withMessage("password filed should be min 8 chars and max be 19 chars.")

            .custom((value, ctx) => {
                if(value !== ctx?.req?.body?.confirm_password) throw "password field and confirm_password field should be same.";
                return true
            })
    ]
};

module.exports = {
    registerValidator
}