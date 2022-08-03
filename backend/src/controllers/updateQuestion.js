const knex = require('../database/connection')

const updateQuestion = async (req, res) => {


    return res.status(200).json({ "Mensagem": "Hello World" })
}

module.exports = updateQuestion