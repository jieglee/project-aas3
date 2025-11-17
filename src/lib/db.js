import mysql from "mysql2/promise";

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "amantaruna20",
    database: "db_perpus",
});