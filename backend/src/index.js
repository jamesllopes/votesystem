require('dotenv').config();
const express = require('express');
const connection = require('./database/connection')

const app = express();

app.get('/', async (req, res) => {

    // connection.connect(function (err) {
    //     if (err) throw err;
    //     connection.query("SELECT * FROM usuarios", function (err, result) {
    //         if (err) return res.status(400).json(err.sqlMessage);
    //         return res.status(200).json(result);
    //     })
    // })

    return res.status(200).json({ "Mensagem": "Hello World" })

})

app.listen(process.env.PORT, process.env.HOST)
