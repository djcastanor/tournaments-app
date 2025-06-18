const AWS = require('aws-sdk');
const tableName = process.env.TBL_TOURNAMENTS || 'tournaments-table-dev';
const docClient = new AWS.DynamoDB.DocumentClient();

class TournamentRepository {
    async getAll(){
        const params = {
            TableName: tableName,
        };
        const result = await docClient.scan(params).promise();
        return result.Items || [];
    }
}

module.exports = TournamentRepository;