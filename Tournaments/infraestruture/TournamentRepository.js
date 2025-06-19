const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const Tournament = require('../domain/models/tournament');

const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TOURNAMENTS_TABLE || 'tournaments-table-dev';

class TournamentRepository {
    async save(tournamentData) {
        const tournament = new Tournament({
            tournamentId: uuidv4(),
            ...tournamentData
        });

        const params = {
            TableName: TABLE_NAME,
            Item: tournament
        };

        await dynamo.put(params).promise();
        return tournament;
    }

    async getAll() {
        const params = {
            TableName: process.env.TOURNAMENTS_TABLE || 'tournaments-table-dev'
        };

        const result = await dynamo.scan(params).promise();
        return result.Items;
    }

    async getById(tournamentId) {
    const params = {
        TableName: process.env.TOURNAMENTS_TABLE || 'tournaments-table-dev',
        Key: {
            tournamentId: tournamentId
        }
    };

    const result = await dynamo.get(params).promise();
    return result.Item;
}

}

module.exports = TournamentRepository;