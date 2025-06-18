class UserRepository {
    constructor() {
        this.users = [{
            id:1,
            username: 'davcasta',
            password: '12345'
        }];
    }

    async validateUser(username, password) {
        return this.users.find(u => u.username === username && u.password === password) || null;
    }
}

module.exports = UserRepository;