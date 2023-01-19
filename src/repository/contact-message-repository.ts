import connection from "../services/database";
import ContactMessage from "../models/contact-message";

export default {
    save: async (contactMessage: ContactMessage) => {
        return await new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO kontakt(korisnik_ime, korisnik_email, korisnik_msg) VALUES (?, ?, ?);",
                [contactMessage.getName(), contactMessage.getEmail(), contactMessage.getMessage()],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(new Error(err.message));
                        return;
                    }
                    resolve(result);
                }
            );
        })
    }
}