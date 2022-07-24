const mysql = require("mysql");
const fastcsv = require("fast-csv");
const fs = require("fs");

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

function isInDB(data) {

    if(db.query('SELECT id FROM Scans WHERE hash_id = ?', [data])){
       return true;
    } else {
        return false;
    }
}

const generateRandomString = (strLength, scanId) => {
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from({
        length: strLength
    },(v, k) => chars[Math.floor(Math.random() * chars.length)]);

    const randomString = randomArray.join("");
    if(isInDB(randomString)){
        generateRandomString(strLength, scanId);
    } else {
        reportHashID(randomString, scanId);
    }
}

const reportHashID = (hashID, scanId) => {
    db.query('UPDATE Scans SET hash_id = ? WHERE scan_id = ?', [hashID, scanId]);
    const ws = fs.createWriteStream(`${hashID}.csv`);
    return ws;
}

// function to call
async function toCSV(scanId) {
    generateRandomString(50, scanId)
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