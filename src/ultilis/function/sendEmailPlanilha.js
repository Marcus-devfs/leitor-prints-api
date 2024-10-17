const sendGrid = require('../../config/sendGrid')
const { planilhaEmailHTML } = require('../htmlEmails/sendPlanilha');

async function sendPlanilha(data) {
    try {
        const htmlExcel = await planilhaEmailHTML();
        const message = {
            from: "marcusvini6277@gmail.com",
            to: "marcusvf.silva@outlook.com",
            subject: `Planilha de Dados`,
            html: htmlExcel,
        };
        const resultadoEmail = await sendGrid.configEmailSendGrid(message);
        return resultadoEmail;
    } catch (error) {
        console.log(error)
        return error;
    }
}



module.exports = {
    sendPlanilha
};