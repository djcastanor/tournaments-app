const Tournament = require('../../domain/models/tournament');
const InvalidRequestException = require('../../domain/exceptions/InvalidRequestException');

class GetTournamentByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(id) {
        if (!id) {
            throw new InvalidRequestException('El ID del torneo es requerido');
        }

        const tournament = await this.repository.getById(id);

        if (!tournament) {
            throw new InvalidRequestException(`No se encontró el torneo con ID: ${id}`);
        }

        return tournament;
    }
}

module.exports = GetTournamentByIdUseCase;
