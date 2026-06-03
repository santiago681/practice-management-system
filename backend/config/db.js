const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:  "practice_management_db",
    port: 3306,
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the MySQL database.");
    }
});

module.exports = connection;