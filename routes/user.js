const { AuthController } = require("../controllers/auth.controller");
const { UserController } = require("../controllers/user.controller");
const { checkLogin } = require("../middlewares/checkAuth");
const { errorValidationMapper } = require("../middlewares/checkvalidation");
const { registerValidator } = require("../validators/authValidation");

const router = require("express").Router();

router.post("/register", registerValidator() , errorValidationMapper , AuthController.register);
router.post("/login", AuthController.login);

router.get("/profile", checkLogin , UserController.profile)

module.exports = router