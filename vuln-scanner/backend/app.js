const express = require("express");
const https = require('https');
const fs = require('fs');
const app = express();
const mysql = require('mysql');
var cors = require('cors')
const crypto = require('crypto');

const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};


app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

// ------------------------------------------------------------USER----------------------------------------------------

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
        const token = crypto.pbkdf2Sync(req.body.password+username, timestamp.toString(10), 10, 64, `sha512`).toString(`hex`);
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
        db.query('INSERT INTO Users ( user_name, user_email, user_password) VALUES (?, ?, ?)', [username, email, password], (error) => {
          // If there is an issue with the query, output the error
          if (error) throw error;

          const timestamp = new Date().getTime();
          const token = crypto.pbkdf2Sync(req.body.password+username, timestamp.toString(10), 10, 64, `sha512`).toString(`hex`);
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
      }else{
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

const PORT = process.env.PORT || 3000;

https.createServer(httpsOptions, app).listen(PORT);

//app.listen(PORT, console.log(`Server started on port ${PORT}`));