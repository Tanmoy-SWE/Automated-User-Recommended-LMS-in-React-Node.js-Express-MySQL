const express = require('express');
const mysql = require('mysql2');

const router = express.Router();



// route to get all books
router.get('/', (req, res) => {
    connection.query('SELECT * FROM books', (error, results, fields) => {
        if (error) {
            console.error('Error fetching books:', error.stack);
            res.status(500).send('Error fetching books.');
            return;
        }
        res.json(results);
    });
});

// route to add a book
router.post('/books', (req, res) => {
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

// route to edit a book
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, author, publication_date, isbn, status } = req.body;
    connection.query(
        'UPDATE books SET title=?, author=?, publication_date=?, isbn=?, status=? WHERE id=?',
        [title, author, publication_date, isbn, status, id],
        (error, results, fields) => {
            if (error) {
                console.error('Error updating book:', error.stack);
                res.status(500).send('Error updating book.');
                return;
            }
            res.json({ message: 'Book updated successfully.' });
        }
    );
});

// route to delete a book
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        'DELETE FROM books WHERE id=?',
        [id],
        (error, results, fields) => {
            if (error) {
                console.error('Error deleting book:', error.stack);
                res.status(500).send('Error deleting book.');
                return;
            }
            res.json({ message: 'Book deleted successfully.' });
        }
    );
});

module.exports = router;
