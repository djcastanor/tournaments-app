class LoginController {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const result = await this.loginUseCase.execute({ username, password });
            res.json(result);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    }
}

module.exports = LoginController;

