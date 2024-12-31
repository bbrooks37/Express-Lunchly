/** Database for lunchly */
const { Pool } = require('pg');
const config = require('./config'); // Adjust the path as necessary

// Database configuration
const pool = new Pool(config.db);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
