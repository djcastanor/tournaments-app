const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

class BuyTicketUseCase {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository
    }

    async execute({ tournamentId, buyer }) {
        const buyDate = new Date().toISOString();
        const ticketId = uuidv4();

        const ticket = {
            ticketId,
            tournamentId,
            buyer,
            buyDate
        };

        await this.ticketRepository.save(ticket);
        
        const qrCode = await QRCode.toDataURL(ticketId);

        return {
            ...ticket,
            qrCode
        };
    }
}

module.exports = BuyTicketUseCase;