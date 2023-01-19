import express, {Response, Request} from "express";
import cors from "cors";
import contactMessageRepository from "./repository/contact-message-repository";
import ContactMessage from "./models/contact-message";
import reservationRepository from "./repository/reservation-repository";
import Reservation from "./models/reservation";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

function getDates(startDate: Date, stopDate: Date): Date[] {
    let dateArray : Date[] = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
}

app.post("/createContactMessage", async (request: Request, response: Response) => {
    await contactMessageRepository.save(new ContactMessage(request.body.name, request.body.email, request.body.message));
    response.sendStatus(200);
});

app.post("/createReservation", async (request: Request, response: Response) => {
    try {
        await reservationRepository.save(new Reservation(request.body.roomType, request.body.numberOfVisitors, request.body.dateFrom, request.body.dateTo));
    }catch (err){
        response.sendStatus(400);
        return;
    }
   response.sendStatus(200);
});

app.get("/allOccupiedDates", async (request: Request, response: Response) => {
    const month = request.query.month as unknown as number;
    const year = request.query.year as unknown as number;
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const allOccupiedIntervals: Reservation[] = await reservationRepository.getIntersectedIntervals(startDate, endDate);
    const allOccupiedDates: Date[] = [];
    allOccupiedIntervals.forEach((interval: Reservation) =>{
        allOccupiedDates.push(... getDates(interval.getDateFrom(), interval.getDateTo()));
    });
    response.send(allOccupiedDates);
});

app.listen(port, () => {
    console.log("app running");
});