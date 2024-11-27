function formattDateAndHour() {
    const data = new Date();

    // Subtrai 3 horas do horário atual
    data.setHours(data.getHours() - 3);
    
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');

    // Formato para nome de arquivo: YYYY-MM-DD_HH-mm-ss
    return `${ano}-${mes}-${dia}_${hora}-${minutos}`;
}


function formatPorcentagem(value) {
    const formattedValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 2 }).format(formattedValue / 100);
}

const calculationPercentageOfValue = (percentage, total) => {
    const valueCalculation = (total * percentage) / 100;
    return parseFloat(valueCalculation);
};

module.exports = {
    formattDateAndHour,
    formatPorcentagem,
    calculationPercentageOfValue
}