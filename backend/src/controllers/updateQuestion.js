const knex = require('../database/connection')
const { tratamentoData } = require('../utils/utilsFunctions')

const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { pergunta, respostas } = req.body;
    const { dataFinal, dataInicial, statusPergunta } = tratamentoData(req)



    try {
        const question = await knex('perguntas').where('id', Number(id)).first();

        if (!question) {
            return res.status(404).json('Enquete não encontrada');
        }

        const questionUpdate = await knex('perguntas')
            .update({ pergunta, data_inicial: dataInicial, data_final: dataFinal, status_pergunta: statusPergunta })
            .where('id', Number(id));

        for (resp of respostas) {
            console.log(resp.resposta)
            await knex('respostas')
                .update({ resposta: resp.resposta })
                .where('id', resp.id);
        }

        if (!questionUpdate) {
            return res.status(400).json("A enquete não foi atualizada");
        }

        return res.status(200).json('A enquete foi atualizada com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = updateQuestion