const { AuthController } = require("../controllers/auth.controller");
const { errorValidationMapper } = require("../middlewares/checkvalidation");
const { registerValidator } = require("../validators/authValidation");

const router = require("express").Router();

router.post("/register", registerValidator() , errorValidationMapper , AuthController.register)

module.exports = router