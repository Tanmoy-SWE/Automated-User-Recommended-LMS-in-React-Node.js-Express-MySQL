const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'rootABCD1234@',
  database: 'LMS'
});

module.exports = { pool };
