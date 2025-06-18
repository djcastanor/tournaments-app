const express = require('express');
const router = express.Router();

const UserRepository = require('../../infraestruture/UserRepository');
const LoginUseCase = require('../../application/use_cases/LoginUseCase');
const LoginController = require('../controllers/LoginController');
const authMiddleware = require('../http/middleware/authMiddleware');

const loginUseCase = new LoginUseCase(new UserRepository());
const loginController = new LoginController(loginUseCase);

router.post('/login', (req, res) => loginController.login(req, res));

router.get('/perfil', authMiddleware, (req, res) => {
    res.json({ message: `Bienvenido, ${req.user.username}` });
});

module.exports = router;