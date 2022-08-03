const knex = require('../database/connection')

const createQuestions = async (req, res) => {
    const { pergunta, data_inicial, data_final, resposta } = req.body;
    const dataInicial = new Date(data_inicial)
    const dataFinal = new Date(data_final)
    let statusPergunta = ''

    if (dataInicial >= new Date() && dataInicial <= dataFinal) {
        statusPergunta = 'Em Andamento'
    }

    if (dataInicial < new Date()) {
        statusPergunta = 'Não Iniciada'
    }

    if (new Date() > dataFinal) {
        statusPergunta = 'Finalizada'
    }

    const formatarRespostas = (resposta, id_pergunta) => {
        const respostasFormatadas = [];
        resposta.map((resp) => {
            respostasFormatadas.push({
                id_pergunta,
                resposta: resp,
            });
        });
        return respostasFormatadas;
    }

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