const sendGrid = require('../../config/sendGrid')
const { planilhaEmailHTML } = require('../htmlEmails/sendPlanilha');
const fs = require('fs');

async function sendPlanilha(buffer, user, fileName) {
    try {
        const htmlExcel = await planilhaEmailHTML(user);
        const message = {
            from: "marcusvini6277@gmail.com",
            to: [user.email],
            bcc: ['marcusvf.silva@outlook.com'],
            subject: `Planilha de Dados`,
            html: htmlExcel,
            attachments: [
                {
                    filename: `${fileName}.xlsx`,
                    content: buffer.toString('base64'),  // Converte o Buffer para base64
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    disposition: 'attachment',
                }
            ]
        };

        const resultadoEmail = await sendGrid.configEmailSendGrid(message);
        return resultadoEmail;
    } catch (error) {
        console.log('erro ao enviar email: ', error)
        return error;
    }
}



module.exports = {
    sendPlanilha
};