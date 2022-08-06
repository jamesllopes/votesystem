const dateFormat = (date) => {
    let data = new Date(date)
    let dataFormatada = ((data.getUTCDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
    return dataFormatada
}

export default dateFormat