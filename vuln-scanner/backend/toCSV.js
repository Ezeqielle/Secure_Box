const mysql = require("mysql");
const fastcsv = require("fast-csv");
const fs = require("fs");

// generate id 50 char
// check if not already in bdd

const ws = fs.createWriteStream("output.csv");

const db = mysql.createConnection({
    host: "10.21.22.4",
    user: "root",
    password: "example",
    database: "secureBox"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

async function toCSV(scanId) {
    db.query("SELECT * FROM Hosts WHERE scan_id = ?", [scanId] , function(error, data, fields) {
        if (error) throw error;
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("csv done!");
            })
            .pipe(ws);
    });
};

module.exports = { toCSV };