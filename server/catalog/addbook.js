const express = require('express');
const router = express.Router();
const cors = require('cors');
const mysql = require('mysql2');

// create a connection to the database
const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rootABCD1234@',
      database: 'LMS',
});

// enable CORS
router.use(cors());
// route to add a book
router.post('/addBook', (req, res) => {
    const { title, author, publication_date, isbn, status } = req.body;
    connection.query(
        'INSERT INTO books (title, author, publication_date, isbn, status) VALUES (?, ?, ?, ?, ?)',
        [title, author, publication_date, isbn, status],
        (error, results, fields) => {
            if (error) {
                console.error('Error adding book:', error.stack);
                res.status(500).send('Error adding book.');
                return;
            }
            res.json({ id: results.insertId });
        }
    );
});

module.exports = router;
