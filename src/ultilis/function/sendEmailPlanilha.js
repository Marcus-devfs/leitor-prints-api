const sendGrid = require('../../config/sendGrid')
const { planilhaEmailHTML } = require('../htmlEmails/sendPlanilha');
const fs = require('fs');

async function sendPlanilha(buffer) {
    try {
        const htmlExcel = await planilhaEmailHTML();
        console.log('buffer: ', buffer)

        const message = {
            from: "marcusvini6277@gmail.com",
            to: "marcusvf.silva@outlook.com",
            subject: `Planilha de Dados`,
            html: htmlExcel,
            attachments: [
                {
                    filename: 'planilha.xlsx',
                    content: buffer.toString('base64'),  // Converte o Buffer para base64
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    disposition: 'attachment',
                }
            ]
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