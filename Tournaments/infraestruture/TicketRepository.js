const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const Ticket = require('../domain/models/Ticket');

const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TICKETS_TABLE || 'tickets-table-dev';

class TicketRepository {
    async save(ticketData) {
        const ticket = new Ticket({
            ticketId: uuidv4(),
            ...ticketData
        });

        const params = {
            TableName: TABLE_NAME,
            Item: ticket
        };

        await dynamo.put(params).promise();
        return ticket;
    }
}

module.exports = TicketRepository;