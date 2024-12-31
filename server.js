const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require('pg');
const nunjucks = require("nunjucks");
const routes = require("./routes");
const path = require("path");
const favicon = require("serve-favicon");
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Configure Nunjucks
nunjucks.configure('templates', {
  autoescape: true,
  express: app
});

// Routes
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
