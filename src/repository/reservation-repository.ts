import Reservation from "../models/reservation";
import connection from "../services/database";
import moment from "moment";

const getIntersectedIntervals = (dateFrom: Date, dateTo: Date): Promise<Reservation[]> => {
    return new Promise(
        (resolve, reject) => {

            connection.query(
                "SELECT id, tip_sobe, br_posetilaca, datum_od, datum_do FROM rezervacija WHERE (? >= rezervacija.datum_od AND ? <= rezervacija.datum_do) OR (? <= rezervacija.datum_od AND ? >= rezervacija.datum_do) OR (? >= rezervacija.datum_od AND ? >= rezervacija.datum_do AND ? <= rezervacija.datum_do) OR (? <= rezervacija.datum_od AND ? <= rezervacija.datum_do AND ? >= rezervacija.datum_od);",
                [dateFrom, dateTo, dateFrom, dateTo, dateFrom, dateTo, dateFrom, dateFrom, dateTo, dateTo],
                (err, result) =>{
                    if (err) {
                        console.error(err);
                        reject(new Error(err.message));
                        return;
                    }
                    let resultArray = result as any[];
                    resolve(resultArray.map((res) => new Reservation(res.tip_sobe, res.br_posetilaca, res.datum_od, res.datum_do)));
                }
            );
        }
    );
}

export default {
    getIntersectedIntervals,
    save: (reservation: Reservation) => {
        return new Promise(async (resolve, reject) => {
            const reservations = await getIntersectedIntervals(reservation.getDateFrom(), reservation.getDateTo());
            if(reservations.length != 0){
                throw new Error("Interval occupied");
            }
            connection.query(
                "INSERT INTO rezervacija(tip_sobe, br_posetilaca, datum_od, datum_do) VALUES (?, ?, ?, ?);",
                [reservation.getRoomType(), reservation.getNumberOfVisitors(), moment(reservation.getDateFrom()).format("YYYY-MM-DD"), moment(reservation.getDateTo()).format("YYYY-MM-DD")],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(new Error(err.message));
                        return;
                    }
                    resolve(result);
                });
        });
    }
}