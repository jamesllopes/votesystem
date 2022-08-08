const knex = require('../database/connection')

const countVote = async (req, res) => {
    const { id, qtd_votos } = req.body

    try {
        await knex('respostas')
            .update({ qtd_votos })
            .where('id', Number(id));

        return res.status(200).json('Voto computado com sucesso!');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    countVote
}