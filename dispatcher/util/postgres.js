const { Pool } = require('pg');

const CONFIG = require('../config/posgres');

const pool = new Pool({
  user: CONFIG.USER,
  host: CONFIG.HOST,
  database: CONFIG.DATABASE,
  password: CONFIG.PASSWORD,
  port: CONFIG.PORT,
});

module.exports = pool;
