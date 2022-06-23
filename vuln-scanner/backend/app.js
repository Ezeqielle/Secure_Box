const express = require("express");
const https = require('https');
const fs = require('fs');
const app = express();

const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
const PORT = process.env.PORT || 3000;

https.createServer(httpsOptions, app).listen(PORT);
  
//app.listen(PORT, console.log(`Server started on port ${PORT}`));