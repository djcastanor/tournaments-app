class Ticket {
    constructor({ ticketId, tournamentId, buyer, buyDate, fee }) {
        this.ticketId = ticketId;
        this.tournamentId = tournamentId;
        this.buyer = buyer;
        this.buyDate = buyDate;
    
    }
}

module.exports =  Ticket;

