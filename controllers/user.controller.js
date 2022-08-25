class UserController {
    profile(req, res, next){
        const user = req.user
        return res.status(200).json({
            status : 200,
            success : true,
            user
        })
    }
}

module.exports = {
    UserController : new UserController()
}