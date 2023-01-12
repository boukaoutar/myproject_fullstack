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
        //console.log("RESULT GET : ",result)
        res.status(200).json(result)
    })
}

//UPDATE
app.get('/get/:id', (req, res) => {
    let params = req.params;
    getOneUser(params, res); 
   
})

function getOneUser(params, res){
    let {id} = params
    connection.query(`SELECT * FROM users WHERE 1 = 1 and id = ${id}`,
    (err, result) => {
        console.log("ERROR : ",err);
        console.log("RESULT GET ONE USER  : ",result)
        res.status(200).json(result)
    })
}
app.put('/update/:id', (req, res) => {
    let body = req.body;
    let params = req.params
    updateUser(params, body, res);
    
})

function updateUser(params, body, res) {
    let {name, email, contact} = body;
    let {id} = params

    connection.query(`UPDATE users SET name = '${name}', email = '${email}',contact = '${contact}' WHERE id = '${id}'`,
    (err,result) => {
        console.log(err);
        console.log("RESULT UPDATE: ",result)
        res.status(200).json(result)
    })
}

//DELETE
app.delete('/delete/:id', (req, res) => {
    let params = req.params;
    //console.log("Bodyy : ", req.params.id)
    deleteUser(params);
     
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