const yup = require('./config')

const schemaVotes = yup.object().shape({
    id: yup.number().required(),
    qtd_votos: yup.number().required(),
})

module.exports = schemaVotes