const Tournament = require('../../domain/models/tournament');
const InvalidRequestException = require('../../domain/exceptions/InvalidRequestException');

class GetAllTournamentsUseCase {
    constructor(repository){
        this.repository = repository;
    }

    async execute(data){
        return await this.repository.getAll();
    }
}

module.exports = GetAllTournamentsUseCase;