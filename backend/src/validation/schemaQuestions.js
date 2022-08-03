const yup = require('./config')

const schemaQuestions = yup.object().shape({
    pergunta: yup.string().required(),
    data_inicial: yup.date().required(),
    data_final: yup.date().required(),
    resposta: yup.array().required()
})

module.exports = schemaQuestions