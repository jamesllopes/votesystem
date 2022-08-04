const knex = require('../database/connection')

const deleteQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await knex('perguntas').where('id', Number(id)).first()

        if (!question) {
            return res.status(404).json('Enquete não encontrada');
        }

        const responseDelete = await knex('respostas').where('id_pergunta', Number(id)).del();
        const questionDelete = await knex('perguntas').where('id', Number(id)).del();

        if (!questionDelete || !responseDelete) {
            return res.status(400).json("A enquete não foi excluida");
        }

        return res.status(200).json('Enquete excluida com sucesso');

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    deleteQuestion
}