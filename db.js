require("dotenv").config();
const mysql = require("mysql2");

// create the connection to database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// simple query
db.query(
  'SELECT * FROM `movies`',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
  }
);

module.exports = db;