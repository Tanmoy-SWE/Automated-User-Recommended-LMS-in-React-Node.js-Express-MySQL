const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json()); // Add this line to parse request body as JSON


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootABCD1234@',
    database: 'LMS',
 });

app.post('/login', (req, res) => {
    const username = 'Tanmoy';
    const password = 'abcd1234';
    
    db.query(
        "SELECT * FROM admins WHERE username = ? AND password = ?",
        [username, password],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
    
            if (result.length > 0) {
                res.send( result);
                }else({message: "Wrong username/password comination!"});
            }
        
    );
   });

module.exports = app;