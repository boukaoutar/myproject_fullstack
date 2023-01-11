const express = require("express")
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

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
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;

    connection.query(" INSERT INTO users (name, email,contact) VALUES (?,?,?)",[name,email,contact], 
    (err,result) => {
        console.log(err);
    })

    getUsers(res);
});

//READ
app.get('/', (req, res) => {
   
    getUsers(res);
    
})

function getUsers(res){
    let query = "SELECT * FROM users";
    connection.query(query,
    (err, result) => {
        console.log("ERROR : ",err);
        console.log("RESULT : ",result)
        res.status(200).json(result)
    })
}

app.listen(8080, () => {
    console.log("Running the server");
});