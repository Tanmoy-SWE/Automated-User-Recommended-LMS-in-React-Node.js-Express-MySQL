const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootABCD1234@',
  database: 'LMS'
});

connection.connect((error) => {
  if (error) {
    console.error('Database connection error:', error);
  } else {
    console.log('Database connected');
  }
});

app.post('/login', (req, res) => {
    console.log(req.body);
  const { username, password } = req.body;
  const query = 'SELECT * FROM admins WHERE username = ?';
  connection.query(query, [username], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'An error occurred while logging in' });
    } else if (results.length === 0) {
      res.status(401).json({ message: 'Incorrect username or password' });
    } else {
      const admin = results[0];
      bcrypt.compare(password, admin.password, (error, result) => {
        if (error) {
          console.error('Password comparison error:', error);
          res.status(500).json({ message: 'An error occurred while logging in' });
        } else if (result === false) {
          res.status(401).json({ message: 'Incorrect username or password' });
        } else {
          res.json({ message: 'Login successful' });
        }
      });
    }
  });
});

module.exports=app;