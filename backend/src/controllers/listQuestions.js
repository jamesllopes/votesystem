const knex = require('../database/connection')

const listQuestions = async (req, res) => {

    try {
        const questions = await knex('perguntas').first()

        return res.status(200).json(questions);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listQuestions
}