const knex = require('../database/connection')

const listQuestions = async (req, res) => {
    try {
        const questions = await knex.select('id', 'pergunta', 'data_inicial',
            'data_final', 'status_pergunta')
            .from('perguntas')

        return res.status(200).json(questions);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const listOneQuestion = async (req, res) => {
    const { id } = req.params
    try {

        const question = await knex('perguntas')
            .where('id', Number(id))
            .first()

        const resp = await knex('respostas')
            .where('id_pergunta', Number(id))

        if (!question) {
            return res.status(404).json('Enquete não encontrada');
        }

        const result = [question, resp]

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    listQuestions,
    listOneQuestion
}