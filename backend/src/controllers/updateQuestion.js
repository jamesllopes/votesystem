const knex = require('../database/connection')
const { formatarRespostas, tratamentoData } = require('../utils/utilsFunctions')

const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { pergunta, resposta } = req.body;
    const { dataFinal, dataInicial, statusPergunta } = tratamentoData(req)

    try {
        const question = await knex('perguntas').where('id', Number(id)).first();

        if (!question) {
            return res.status(404).json('Enquete não encontrada');
        }

        const questionUpdate = await knex('perguntas')
            .update({ pergunta, data_inicial: dataInicial, data_final: dataFinal, status_pergunta: statusPergunta })
            .where('id', Number(id));

        const [respostasFormatadas] = formatarRespostas(resposta, id);
        console.log(respostasFormatadas)

        await knex('respostas')
            .update({ resposta: resposta })
            .where('id_pergunta', Number(id));


        if (!questionUpdate) {
            return res.status(400).json("A enquete não foi atualizada");
        }

        return res.status(200).json('A enquete foi atualizada com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = updateQuestion