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
app.post('/user', (req, res) => {
    const body = req.body
    addUser(body,res);
});

function addUser(body,res)
{
    let {name,email,contact} = body
    connection.query(" INSERT INTO users (name, email,contact) VALUES (?,?,?)",[name,email,contact], 
    (err,result) => {
        console.log(err);
        console.log("RESULT POST : ",result)
        res.status(200).json(result)
    })
}
//READ
app.get('/', (req, res) => {
    getUsers(res); 
})

function getUsers(res){
    let query = "SELECT * FROM users";
    connection.query(query,
    (err, result) => {
        console.log("ERROR : ",err);
        console.log("RESULT GET : ",result)
        res.status(200).json(result)
    })
}

app.delete('/delete/:id', (req, res) => {
     let params = req.params;
     console.log("Bodyy : ", req.params.id)
     deleteUser(params);
     res.status(200).json({success: true, message: deleteUser(params)});
});

function deleteUser(params){
   
    let {id} = params
    connection.query(`DELETE FROM users WHERE 1 = 1 and id = ${id}`,
    (err,result) => {
        console.log(err);
        console.log("RESULT DELETE: ",result)
    })
}

app.listen(8080, () => {
    console.log("Running the server");
});