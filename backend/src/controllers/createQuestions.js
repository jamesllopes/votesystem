const knex = require('../database/connection')
const { formatarRespostas, tratamentoData } = require('../utils/utilsFunctions')

const createQuestions = async (req, res) => {
    const { pergunta, resposta } = req.body;
    const { dataFinal, dataInicial, statusPergunta } = tratamentoData(req)

    try {
        const question = await knex('perguntas')
            .insert([{ pergunta, data_inicial: dataInicial, data_final: dataFinal, status_pergunta: statusPergunta }])

        const respostasFormatadas = formatarRespostas(resposta, question);

        await knex('respostas')
            .insert(respostasFormatadas)

        if (!question) {
            return res.status(400).json('A enquete não foi cadastrada');
        }

        if (resposta.length < 3) {
            return res.status(400).json('É obrigatório pelo menos 3 opções de respostas');
        }

        return res.status(200).json('A enquete foi cadastrado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    createQuestions
}