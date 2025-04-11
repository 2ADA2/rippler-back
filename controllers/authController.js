class AuthController {
    login(req, res) {
        res.status(200).json({"token" : "123"})
    }
    register(req, res) {
        res.status(200).json({"message" : "account registered"})
    }
}

export default new AuthController();