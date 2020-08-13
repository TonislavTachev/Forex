const express = require("express");
const app = express();
const fs = require('fs');
const port = process.env.port || 5000;
var forex_data = {};

app.get('/forex', (req,res)=>{
    readFile();
    res.json(forex_data).status(200);
})

const readFile = () =>{
    let forex = fs.readFileSync('./data/currencies.json');
    let data = JSON.parse(forex);
    forex_data = {...data}
}

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})