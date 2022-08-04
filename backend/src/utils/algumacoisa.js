
const tratamentoData = (req) => {
    const { data_inicial, data_final } = req.body;
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

    return {
        dataFinal,
        dataInicial,
        statusPergunta
    }
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




module.exports = {
    tratamentoData,
    formatarRespostas
}