const cors = require("cors");
const express = require("express");
const fs = require('fs');
var https = require('https');
const app = express();

global.__basedir = __dirname;

var corsOptions = {
  origin: "*"
};
var options = {
  cert: fs.readFileSync('callbit.com-crt.pem').toString(),
  key: fs.readFileSync('callbit.com-key.pem').toString()
};

app.use(cors(corsOptions));

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 3002;
var server = https.createServer(options,app);
server.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
