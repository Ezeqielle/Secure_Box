const mysql = require("mysql");
const fastcsv = require("fast-csv");
const fs = require("fs");


function isInDB(data, db) {

    if(db.query('SELECT scan_id FROM Scans WHERE hash_id = ?', [data])){
       return true;
    } else {
        return false;
    }
}

const generateRandomString = (strLength, scanId, db) => {
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from({
        length: strLength
    },(v, k) => chars[Math.floor(Math.random() * chars.length)]);

    const randomString = randomArray.join("");
    let hashReport = reportHashID(randomString, scanId, db);
    return hashReport;
}

const reportHashID = (hashID, scanId, db) => {
    db.query('UPDATE Scans SET hash_id = ? WHERE scan_id = ?', [hashID, scanId]);
    
    const toWrite = fs.createWriteStream(`./reports/${hashID}.csv`);
    return toWrite;
}

// function to call
async function toCSV(scanId, db) {
    let ws = generateRandomString(50, scanId, db)
    db.query("SELECT h.host_ip, h.host_name, p.port_number, p.service_name, p.service_version, cve_name, cve_access_complexity FROM CVE AS c INNER JOIN Ports AS p ON p.port_id = c.port_id INNER JOIN Hosts AS h on p.host_id = h.host_id where scan_id = ? && c.cve_hidden = 0", [scanId] , function(error, data, fields) {
        if (error) throw error;
        const jsonData = JSON.parse(JSON.stringify(data));
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("csv done!");
            })
            .pipe(ws);
    });
};

module.exports = { toCSV };
