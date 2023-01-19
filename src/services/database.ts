import mysql from "mysql2";

const connection = mysql.createConnection({
    host: process.env.HOST as string,
    user: process.env.USER as string,
    password: process.env.PASSWORD as string,
    database: process.env.DATABASE as string,
    port: process.env.DB_PORT as unknown as number
});

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
});

export default connection;