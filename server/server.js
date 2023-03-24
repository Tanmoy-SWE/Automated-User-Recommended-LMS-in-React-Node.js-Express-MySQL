const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const catalogRoutes = require('./catalog/catalog');
const app = express();
const cors = require('cors');
const port = 8000;

app.use(cors());
app.use(express.json()); // Add this line to parse request body as JSON

// Serve static files from the client/build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle GET requests to /books
app.get('/books', async (req, res) => {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rootABCD1234@',
      database: 'LMS',
    });

    // Query the books table and return the results
    const [rows] = await connection.query('SELECT * FROM books');
    res.json(rows);

    // Close the database connection
    await connection.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Handle POST requests to /addBook
app.post('/addBook', async (req, res) => {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rootABCD1234@',
      database: 'LMS',
    });

    // Insert the new book into the books table
    const [result] = await connection.query('INSERT INTO books SET ?', req.body);

    // Send a response indicating success
    res.status(201).json({ message: 'Book added successfully!' });

    // Close the database connection
    await connection.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Serve the client-side React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
