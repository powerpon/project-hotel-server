class Reservation{
    private id?: number;
    private roomType: string;
    private numberOfVisitors: number;
    private dateFrom: Date;
    private dateTo: Date;

    public constructor(roomType: string, numberOfVisitors: number, dateFrom: Date, dateTo: Date) {
        this.roomType = roomType;
        this.numberOfVisitors = numberOfVisitors;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    public getId(): number | undefined{
        return this.id;
    }

    public getRoomType(): string{
        return this.roomType;
    }

    public getNumberOfVisitors(): number{
        return this.numberOfVisitors;
    }

    public getDateFrom(): Date{
        return this.dateFrom;
    }

    public getDateTo(): Date{
        return this.dateTo;
    }

    public setId(id: number){
        this.id = id;
    }

    public setRoomType(roomType: string){
        this.roomType = roomType;
    }

    public setNumberOfVisitors(numberOfVisitors: number){
        this.numberOfVisitors = numberOfVisitors;
    }

    public setDateFrom(dateFrom: Date){
        this.dateFrom = dateFrom;
    }

    public setDateTo(dateTo: Date){
        this.dateTo = dateTo;
    }
}

export default Reservation;