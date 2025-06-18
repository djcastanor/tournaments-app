const jwt = require('jsonwebtoken');

class LoginUseCase {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({ username, password }) {
        const user = await this.userRepository.validateUser(username, password);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const payload = { 
            userId: user.id,
            username: user.username
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { token }

    }

}

module.exports = LoginUseCase;