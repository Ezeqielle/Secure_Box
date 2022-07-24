const express = require("express");
const https = require('https');
const fs = require('fs');
const app = express();
const mysql = require('mysql');
var mime = require('mime');
var path = require('path');
var cors = require('cors')
const crypto = require('crypto');
const nmapParser = require('./nmapParser')
const { exec } = require("child_process");

const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const USER_ADMIN_ROLE = 1
const USER_READER_ROLE = 3
const USER_SCAN_ROLE = 3

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

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

// ------------------------------------------------------------FUNCTIONS----------------------------------------------

const checkToken = async (username, token, userId = -1) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Users WHERE (user_name = ? OR user_id = ?) AND user_token = ?', [username, userId, token], (error, results) => {
      if (error) {
        return reject(error);
      }
      let userTokenInfo = { userId: -1, username: "", userRole: -1, isTokenValid: false }
      if (results.length > 0) {
        userTokenInfo.userId = results[0].user_id
        userTokenInfo.username = results[0].user_name
        userTokenInfo.userRole = results[0].role_id
        userTokenInfo.isTokenValid = true
      }
      resolve(userTokenInfo);
    })
  });
}

app.get('/download', function (req, res) {
  var JSON_RES = { data: {}, error: {} }
  if (req.query !== undefined && req.query.file !== undefined) {

    try {
      var filename = path.basename(file);
      var file = __dirname + '/report/' + filename;
      
      if (fs.existsSync(file)) {
        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
      }
    } catch (err) {
      console.error(err)
      JSON_RES.error = { errorMsg: "File not found" }
      res.status(404)
      res.json(JSON_RES);
      res.end();
    }
  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }
});

app.get("/", async (req, res) => {
  res.json({ data: "Welcome" });
});
app.get("/test", (req, res) => {
  let cmd = `nmap -v -sS -p- -sV 9 -PR -O -oX test-res.xml 192.168.1.42`;
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.json({ data: "scanning" });
    res.end()
  });

});

// ------------------------------------------------------------USER_ROUTES----------------------------------------------------

app.post('/auth', (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  // Ensure the input fields exists and are not empty
  if (req.body != undefined && req.body.username != undefined && req.body.password != undefined) {
    // Capture the input fields
    const username = req.body.username;
    const password = crypto.pbkdf2Sync(req.body.password, username, 1000, 64, `sha512`).toString(`hex`);
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query('SELECT * FROM Users WHERE user_name = ? AND user_password = ?', [username, password], (error, results) => {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Login 
        const timestamp = new Date().getTime();
        const token = crypto.pbkdf2Sync(req.body.password + username, timestamp.toString(10), 10, 64, `sha512`).toString(`hex`);
        // Execute SQL query to set new token for auth
        db.query('UPDATE Users SET user_token = ? WHERE user_name = ?', [token, username], (error) => {
          // If there is an issue with the query, output the error
          if (error) throw error;

          JSON_RES.data = { username: username, token: token }
          res.json(JSON_RES);
          res.end();
        });
      } else {
        JSON_RES.error = { errorMsg: "Incorrect Username and/or Password" }
        res.status(403)
        res.json(JSON_RES);
        res.end();
      }
    });
  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }

});

app.post('/createUser', (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  // Ensure the input fields exists and are not empty
  if (req.body != undefined && req.body.username != undefined && req.body.password != undefined && req.body.email != undefined) {
    // Capture the input fields
    const username = req.body.username;
    const email = req.body.email;
    // Check if user already exists
    db.query('SELECT * FROM Users WHERE user_name = ? OR user_email = ?', [username, email], (error, results) => {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        JSON_RES.error = { errorMsg: "User already exists" }
        res.status(409)
        res.json(JSON_RES);
        res.end();
      } else {
        //hash password
        const password = crypto.pbkdf2Sync(req.body.password, username,
          1000, 64, `sha512`).toString(`hex`);

        // Execute SQL query that'll create new user
        db.query('INSERT INTO Users ( user_name, user_email, user_password, role_id) VALUES (?, ?, ?, ?)', [username, email, password, USER_READER_ROLE], (error) => {
          // If there is an issue with the query, output the error
          if (error) throw error;

          const timestamp = new Date().getTime();
          const token = crypto.pbkdf2Sync(req.body.password + username, timestamp.toString(10), 10, 64, `sha512`).toString(`hex`);
          // Execute SQL query to set new token for auth
          db.query('UPDATE Users SET user_token = ? WHERE user_name = ?', [token, username], (error) => {
            // If there is an issue with the query, output the error
            if (error) throw error;

            JSON_RES.data = { username: username, token: token }
            res.status(201)
            res.json(JSON_RES);
            res.end();
          });
        });
      }
    });

  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }

});

app.post('/editUser', async (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  // Ensure the input fields exists and are not empty
  if (req.body != undefined && req.body.reqUsername != undefined && req.body.reqToken && req.body.username != undefined && req.body.password != undefined && req.body.email != undefined && req.body.firstname != undefined && req.body.firstname != undefined && req.body.role != undefined) {
    // Capture the input fields
    const reqUsername = req.body.reqUsername;
    const reqToken = req.body.reqToken;
    const username = req.body.username;
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const role = req.body.role

    const reqUserInfo = await checkToken(reqUsername, reqToken)

    if (reqUserInfo.isTokenValid) {
      if (reqUserInfo.userRole == USER_ADMIN_ROLE || reqUsername == username) {
        if (reqUsername == username) role = reqUserInfo.userRole;
        // Check if user already exists
        db.query('SELECT * FROM Users WHERE user_name = ? OR user_email = ?', [username, email], (error, results) => {
          // If there is an issue with the query, output the error
          if (error) throw error;
          // If the account exists
          if (results.length > 0) {
            let queryArray = [firstname, lastname, username, email, role]
            let queryString = "UPDATE Users SET user_firstname = ?, user_lastname = ?, user_name = ?, user_email = ?, role_id = ?"
            //hash password
            if (password != "") {
              queryString += ", user_password = ?"
              const hashedPassword = crypto.pbkdf2Sync(password, username,
                1000, 64, `sha512`).toString(`hex`);
              queryArray.push(hashedPassword)
            }

            queryString += " WHERE user_id = ?"
            queryArray.push(results[0].user_id)

            // Execute SQL query that'll modify user
            db.query(queryString, queryArray, (error) => {
              // If there is an issue with the query, output the error
              if (error) throw error;
              JSON_RES.data = { username: reqUsername, token: reqToken }
              res.status(201)
              res.json(JSON_RES);
              res.end();
            });

          } else {
            JSON_RES.error = { errorMsg: "User does not exists" }
            res.status(404)
            res.json(JSON_RES);
            res.end();
          }
        });
      } else {
        JSON_RES.error = { errorMsg: "User is not admin" }
        res.status(403)
        res.json(JSON_RES);
        res.end();
      }
    } else {
      JSON_RES.error = { errorMsg: "Bad token" }
      res.status(403)
      res.json(JSON_RES);
      res.end();
    }

  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }

});

app.get('/checkToken', (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  if (req.query.username != undefined && req.query.token != undefined) {
    const username = req.query.username
    const token = req.query.token
    db.query('SELECT * FROM Users WHERE user_name = ? AND user_token = ?', [username, token], (error, results) => {
      // If there is an issue with the query, output the error
      if (error) throw error;
      if (results.length > 0) {
        JSON_RES.data = { isTokenValid: true }
        res.json(JSON_RES);
      } else {
        JSON_RES.data = { isTokenValid: false }
        res.json(JSON_RES);
      }
      res.end();
    });
  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }
})

app.get('/getUserInfo', async (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  if (req.query.reqUsername != undefined && req.query.reqToken != undefined && (req.query.username != undefined || req.query.userId != undefined)) {
    const reqUsername = req.query.reqUsername
    const reqToken = req.query.reqToken
    const username = req.query.username
    const userId = req.query.userId

    const reqUserInfo = await checkToken(reqUsername, reqToken)
    if (reqUserInfo.isTokenValid) {
      if (reqUserInfo.userRole == USER_ADMIN_ROLE || reqUsername == username) {
        db.query('SELECT * FROM Users WHERE user_name = ? OR user_id = ?', [username, userId], (error, results) => {
          // If there is an issue with the query, output the error
          if (error) throw error;

          if (results.length > 0) {
            JSON_RES.data = { user: results[0] }
          } else {
            JSON_RES.error = { errorMsg: "User does not exist" }
            res.status(404)
          }
          res.json(JSON_RES);
          res.end();
        });
      } else {
        JSON_RES.error = { errorMsg: "User is not admin" }
        res.status(403)
        res.json(JSON_RES);
        res.end();
      }
    } else {
      JSON_RES.error = { errorMsg: "Bad token" }
      res.status(403)
      res.json(JSON_RES);
      res.end();
    }
  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }
})

app.get('/getAllUsers', async (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  if (req.query.username != undefined && req.query.token != undefined) {
    const username = req.query.username
    const token = req.query.token

    const userInfo = await checkToken(username, token)
    if (userInfo.isTokenValid) {
      if (userInfo.userRole == USER_ADMIN_ROLE) {
        db.query('SELECT user_name, user_email, role_id FROM Users', (error, results) => {
          // If there is an issue with the query, output the error
          if (error) throw error;
          JSON_RES.data = { users: results }
          res.json(JSON_RES);
          res.end();
        });
      } else {
        JSON_RES.error = { errorMsg: "User is not admin" }
        res.status(403)
        res.json(JSON_RES);
        res.end();
      }
    } else {
      JSON_RES.error = { errorMsg: "Bad token" }
      res.status(403)
      res.json(JSON_RES);
      res.end();
    }
  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }
})

// ------------------------------------------------------------REPORTS_ROUTES----------------------------------------------------
app.post('/createProject', async (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  // Ensure the input fields exists and are not empty
  if (req.body != undefined && req.body.username != undefined && req.body.token != undefined && req.body.reportName != undefined) {

    // Capture the input fields
    const reportName = req.body.reportName;
    const username = req.body.username
    const token = req.body.token

    const userInfo = await checkToken(username, token)

    if (userInfo.isTokenValid) {
      if (userInfo.userRole == USER_ADMIN_ROLE) {
        let insertDatetime = new Date();
        // Create new project
        db.query('INSERT INTO Reports (report_name, user_id, report_date) VALUES (?, ?, ?)', [reportName, userInfo.userId, insertDatetime.toISOString().split(".")[0]], (error, results) => {
          // If there is an issue with the query, output the error
          if (error) throw error;

          JSON_RES.data = { reportName: reportName, reportId: results.insertId }
          res.status(201)
          res.json(JSON_RES);
          res.end();
        });
      } else {
        JSON_RES.error = { errorMsg: "User is not admin" }
        res.status(403)
        res.json(JSON_RES);
        res.end();
      }
    } else {
      JSON_RES.error = { errorMsg: "Bad token" }
      res.status(403)
      res.json(JSON_RES);
      res.end();
    }

  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }

});

app.get('/getProjectInfo', async (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  // Ensure the input fields exists and are not empty
  if (req.query != undefined && req.query.username != undefined && req.query.token != undefined && req.query.reportId != undefined) {

    // Capture the input fields
    const reportId = req.query.reportId;
    const username = req.query.username
    const token = req.query.token

    const userInfo = await checkToken(username, token)

    if (userInfo.isTokenValid) {
      if (userInfo.userRole == USER_ADMIN_ROLE || userInfo.userRole == USER_READER_ROLE) {
        // Select report
        db.query('SELECT * FROM Reports WHERE report_id = ?', [reportId], (error, results) => {
          // If there is an issue with the query, output the error
          if (error) throw error;

          if (results.length > 0) {
            JSON_RES.data = { reportId, reportName: results[0].report_name, reportDate: results[0].report_date, userId: results[0].user_id }
            res.status(200)
          } else {
            JSON_RES.error = { errorMsg: "Project does not exist" }
            res.status(404)
          }
          res.json(JSON_RES);
          res.end();
        });
      } else {
        JSON_RES.error = { errorMsg: "User is not authorized" }
        res.status(403)
        res.json(JSON_RES);
        res.end();
      }
    } else {
      JSON_RES.error = { errorMsg: "Bad token" }
      res.status(403)
      res.json(JSON_RES);
      res.end();
    }

  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }

});

app.get('/getAllProjects', async (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  // Ensure the input fields exists and are not empty
  if (req.query != undefined && req.query.username != undefined && req.query.token != undefined) {

    // Capture the input fields
    const username = req.query.username
    const token = req.query.token

    const userInfo = await checkToken(username, token)

    if (userInfo.isTokenValid) {
      if (userInfo.userRole == USER_ADMIN_ROLE || userInfo.userRole == USER_READER_ROLE || userInfo.userRole == USER_SCAN_ROLE) {
        // Select report
        db.query('SELECT * FROM Reports', (error, results) => {
          // If there is an issue with the query, output the error
          if (error) throw error;

          if (results.length > 0) {
            JSON_RES.data = { projects: results }
          } else {
            JSON_RES.data = { projects: [] }
            JSON_RES.error = { errorMsg: "No Projects" }
          }
          res.status(200)
          res.json(JSON_RES);
          res.end();
        });
      } else {
        JSON_RES.error = { errorMsg: "User is not authorized" }
        res.status(403)
        res.json(JSON_RES);
        res.end();
      }
    } else {
      JSON_RES.error = { errorMsg: "Bad token" }
      res.status(403)
      res.json(JSON_RES);
      res.end();
    }

  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }

});

// ------------------------------------------------------------SCANS_ROUTES----------------------------------------------------

app.post('/createScan', async (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  // Ensure the input fields exists and are not empty
  if (req.body != undefined && req.body.username != undefined && req.body.token != undefined && req.body.scanName != undefined && req.body.scanTarget != undefined && req.body.scanType != undefined && req.body.reportId != undefined) {


    // Capture the input fields
    const scanName = req.body.scanName;
    const scanTarget = req.body.scanTarget;
    const scanType = req.body.scanType;
    const reportId = req.body.reportId;
    const username = req.body.username
    const token = req.body.token

    const userInfo = await checkToken(username, token)

    if (userInfo.isTokenValid) {
      if (userInfo.userRole == USER_ADMIN_ROLE || userInfo.userRole == USER_SCAN_ROLE) {
        // Create new project
        db.query('INSERT INTO Scans (scan_name, scan_target, scan_type_id, report_id) VALUES (?, ?, ?, ?)', [scanName, scanTarget, scanType, reportId], (error, results) => {
          // If there is an issue with the query, output the error
          if (error) throw error;

          JSON_RES.data = { scanName: scanName, scanId: results.insertId }
          res.status(201)
          res.json(JSON_RES);
          res.end();
        });
      } else {
        JSON_RES.error = { errorMsg: "User is not authorized" }
        res.status(403)
        res.json(JSON_RES);
        res.end();
      }
    } else {
      JSON_RES.error = { errorMsg: "Bad token" }
      res.status(403)
      res.json(JSON_RES);
      res.end();
    }
  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }

});

app.get('/getScan', async (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  // Ensure the input fields exists and are not empty
  if (req.query != undefined && req.query.username != undefined && req.query.token != undefined && req.query.scanId != undefined) {

    // Capture the input fields
    const scanId = req.query.scanId;
    const username = req.query.username
    const token = req.query.token

    const userInfo = await checkToken(username, token)

    if (userInfo.isTokenValid) {
      if (userInfo.userRole == USER_ADMIN_ROLE || userInfo.userRole == USER_READER_ROLE || userInfo.userRole == USER_SCAN_ROLE) {
        // Select report
        db.query('SELECT * FROM Scans WHERE scan_id = ?', [scanId], (error, results) => {
          // If there is an issue with the query, output the error
          if (error) throw error;

          if (results.length > 0) {
            JSON_RES.data = { scan: results[0] }
            res.status(200)
          } else {
            JSON_RES.error = { errorMsg: "Scan does not exist" }
            res.status(404)
          }
          res.json(JSON_RES);
          res.end();
        });
      } else {
        JSON_RES.error = { errorMsg: "User is not authorized" }
        res.status(403)
        res.json(JSON_RES);
        res.end();
      }
    } else {
      JSON_RES.error = { errorMsg: "Bad token" }
      res.status(403)
      res.json(JSON_RES);
      res.end();
    }

  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }

});

app.get('/getProjectScans', async (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  // Ensure the input fields exists and are not empty
  if (req.query != undefined && req.query.username != undefined && req.query.token != undefined && req.query.reportId != undefined) {

    // Capture the input fields
    const reportId = req.query.reportId;
    const username = req.query.username
    const token = req.query.token

    const userInfo = await checkToken(username, token)

    if (userInfo.isTokenValid) {
      if (userInfo.userRole == USER_ADMIN_ROLE || userInfo.userRole == USER_READER_ROLE) {
        // Select report
        db.query('SELECT * FROM Scans WHERE report_id = ? ORDER BY scan_start_date', [reportId], (error, results) => {
          // If there is an issue with the query, output the error
          if (error) throw error;

          if (results.length > 0) {
            JSON_RES.data = { scans: results }
          } else {
            JSON_RES.data = { scans: [] }
            JSON_RES.error = { errorMsg: "No Scans found" }
          }
          res.status(200)
          res.json(JSON_RES);
          res.end();
        });
      } else {
        JSON_RES.error = { errorMsg: "User is not authorized" }
        res.status(403)
        res.json(JSON_RES);
        res.end();
      }
    } else {
      JSON_RES.error = { errorMsg: "Bad token" }
      res.status(403)
      res.json(JSON_RES);
      res.end();
    }

  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }

});

app.post('/startScan', async (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  // Ensure the input fields exists and are not empty
  if (req.body != undefined && req.body.username != undefined && req.body.token != undefined && req.body.scanId != undefined && req.body.scanTarget != undefined) {


    // Capture the input fields
    const scanId = req.body.scanId;
    const scanTarget = req.body.scanTarget;
    const username = req.body.username
    const token = req.body.token

    const userInfo = await checkToken(username, token)

    if (userInfo.isTokenValid) {
      if (userInfo.userRole == USER_ADMIN_ROLE || userInfo.userRole == USER_SCAN_ROLE) {
        let scanDatetime = new Date();
        // Create new project
        db.query('UPDATE Scans SET scan_start_date = ? WHERE scan_id = ?', [scanDatetime.toISOString().split(".")[0], scanId], (error) => {
          // If there is an issue with the query, output the error
          if (error) throw error;
          nmapParser.execCode(scanId, scanTarget, db)
          JSON_RES.data = { scanStartDate: scanDatetime.toISOString().split(".")[0] }
          res.status(200)
          res.json(JSON_RES);
          res.end();
        });
      } else {
        JSON_RES.error = { errorMsg: "User is not authorized" }
        res.status(403)
        res.json(JSON_RES);
        res.end();
      }
    } else {
      JSON_RES.error = { errorMsg: "Bad token" }
      res.status(403)
      res.json(JSON_RES);
      res.end();
    }
  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }

});

// ------------------------------------------------------------CVE_ROUTES----------------------------------------------------
app.get('/getScanCVEs', async (req, res) => {
  var JSON_RES = { data: {}, error: {} }
  // Ensure the input fields exists and are not empty
  if (req.query != undefined && req.query.username != undefined && req.query.token != undefined && req.query.scanId != undefined) {

    // Capture the input fields
    const scanId = req.query.scanId;
    const username = req.query.username
    const token = req.query.token

    const userInfo = await checkToken(username, token)

    if (userInfo.isTokenValid) {
      if (userInfo.userRole == USER_ADMIN_ROLE || userInfo.userRole == USER_READER_ROLE || userInfo.userRole == USER_SCAN_ROLE) {
        // Select report
        db.query('SELECT cve_id, cve_name, cve_cvss FROM CVE AS c INNER JOIN Ports AS p ON p.port_id = c.port_id INNER JOIN (SELECT host_id FROM Hosts WHERE scan_id = ?) h ON h.host_id = p.host_id', [scanId], (error, results) => {
          // If there is an issue with the query, output the error
          if (error) throw error;

          if (results.length > 0) {
            JSON_RES.data = { cves: results }
            res.status(200)
          } else {
            JSON_RES.error = { errorMsg: "No CVEs found for Scan" }
            res.status(200)
          }
          res.json(JSON_RES);
          res.end();
        });
      } else {
        JSON_RES.error = { errorMsg: "User is not authorized" }
        res.status(403)
        res.json(JSON_RES);
        res.end();
      }
    } else {
      JSON_RES.error = { errorMsg: "Bad token" }
      res.status(403)
      res.json(JSON_RES);
      res.end();
    }

  } else {
    JSON_RES.error = { errorMsg: "Bad parameters" }
    res.status(400)
    res.json(JSON_RES);
    res.end();
  }

});

const PORT = process.env.PORT || 3000;

https.createServer(httpsOptions, app).listen(PORT);

//app.listen(PORT, console.log(`Server started on port ${PORT}`));