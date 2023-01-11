const express = require("express")
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    user : "root",
    host: "127.0.0.1",
    password: "root",
    database: "loginsystem",
});

connection.connect((err) => {
    if(!err)
        console.log('********* DATABASE IS CONNECTED *********');
    else
        console.log('********* PROBLEM CONNECTION! *********  : '+ JSON.stringify(err, undefined,2));
});

//CREATE
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    connection.query(" INSERT INTO users (username, password) VALUES (?,?)",[username,password], 
    (err,result) => {
        console.log(err);
    }
    )
});

app.listen(8080, () => {
    console.log("Running the server");
});