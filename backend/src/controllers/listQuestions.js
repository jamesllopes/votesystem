const knex = require('../database/connection')

const listQuestions = async (req, res) => {


    try {
        const questions = await knex.select('id', 'pergunta', 'data_inicial',
            'data_final', 'status_pergunta')
            .from('perguntas')

        const resp = await knex.select('id', 'id_pergunta', 'resposta', 'qtd_votos').from('respostas').groupBy('id')

        const results = [{
            questions,
            resp
        }
        ]

        return res.status(200).json(results);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    listQuestions
}