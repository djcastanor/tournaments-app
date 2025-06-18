const express = require(express);
const router = express.Router();

const TournamentsRepository = require('../../infraestruture/dynamodb/TournamentRepository');
const GetAllTournamentsUseCase = require('../../application/use_cases/getAllTournamentsUseCase');

const repo = new TournamentsRepository();

router.get('/tournaments', async (req, res) => {
    const useCase = new GetAllTournamentsUseCase(repo);
    const result = await useCase.execute();
    res.status(200).json(result);
})

Module.exports = router;