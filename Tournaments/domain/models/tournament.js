class Tournament{
    constructor({tournamentId, name, description, category, responsible, price, fee, startDate, endDate}) {
        this.tournamentId = tournamentId;
        this.name = name;
        this.description = description;
        this.category = category;
        this.responsible = responsible;
        this.price = price;
        this.fee = fee;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

module.exports = Tournament;