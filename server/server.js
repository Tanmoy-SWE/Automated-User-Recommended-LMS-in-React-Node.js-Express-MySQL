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

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootABCD1234@',
  database: 'LMS',
});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ', error);
  } else {
    console.log('Connected to database!');
  }
});

// Define an endpoint to retrieve all users
app.get('/users', (req, res) => {
  // Query the database to retrieve all users
  const sql = 'SELECT * FROM users';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error retrieving users: ', error);
      res.status(500).json({ error: 'Error retrieving users' });
    } else {
      res.json(results);
    }
  });
});
// Handle DELETE requests to /deleteBook/:id
app.delete('/deleteBook/:id', async (req, res) => {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rootABCD1234@',
      database: 'LMS',
    });

    // Delete the book from the books table using the provided book ID
    const [result] = await connection.query('DELETE FROM books WHERE id = ?', req.params.id);
    console.log('Hello')

    // If no rows were affected, the book ID was not found
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      // Send a response indicating success
      res.status(200).json({ message: 'Book deleted successfully!' });
    }

    // Close the database connection
    await connection.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Handle GET requests to /books
app.get('/searchBooks', async (req, res) => {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rootABCD1234@',
      database: 'LMS',
    });

    // Build the SQL query based on the search and filter parameters
    let query = 'SELECT * FROM books';
    const { keywords, author, status } = req.query;
    if (keywords) {
      query += ` WHERE title LIKE '%${keywords}%' OR author LIKE '%${keywords}%'`;
    }
    if (author) {
      if (keywords) {
        query += ' AND';
      } else {
        query += ' WHERE';
      }
      query += ` author='${author}'`;
    }
    if (status) {
      if (keywords || author) {
        query += ' AND';
      } else {
        query += ' WHERE';
      }
      query += ` status='${status}'`;
    }

    // Execute the query and send the results back to the client
    const [rows] = await connection.// Handle POST requests to /addBook
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
        res.status(500).send('Internal Server Er// Handle GET requests to /books')
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
        });query(query);
    res.json(rows);
    console.log(rows)
    // Close the database connection
    await connection.end();
  } 

// const loginFunc = require('./authentication/login')
// app.use('/login', loginFunc)

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootABCD1234@',
  database: 'LMS',
})

app.post('/login', async (req, res)  => {
  const username = req.body.username;
  const password = req.body.password;
  // Create a connection to the database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootABCD1234@',
    database: 'LMS',
  });
  const [adminUser] =  await connection.query("SELECT * FROM admins WHERE password = ?", req.body.password);
  const adminUsername = [adminUser][0][0].username;
  const adminUserpass = [adminUser][0][0].password;
  if (adminUserpass == "abcd1234"){
        console.log("Admin Successfully Logged In")
        res.status(204).send({message : "Admin Successfully Logged In"})
  }
  else{
    res.status(304).send({message : "Admin Login Credentials are not valid"})
  }
 });

 // Handle POST requests to /addBook
app.post('/addUser', async (req, res) => {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rootABCD1234@',
      database: 'LMS',
    });

    // Insert the new user into the users table
    const [result] = await connection.query('INSERT INTO USERS SET ?', req.body);

    // Send a response indicating success
    res.status(201).json({ message: 'Users added successfully!' });

    // Close the databascataloge connection
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