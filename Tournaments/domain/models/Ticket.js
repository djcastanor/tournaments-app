class Ticket {
    constructor({ ticketId, tournamentId, buyer, buyDate }) {
        this.ticketId = ticketId;
        this.tournamentId = tournamentId;
        this.buyer = buyer;
        this.buyDate = buyDate;
    }
}

module.exports =  Ticket;

