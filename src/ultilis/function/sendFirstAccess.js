const sendGrid = require('../../config/sendGrid');
const { credentialsAccessHTML } = require('../htmlEmails/credentialsAccess');

async function sendFirstAccess(user) {
    try {
        const htmlExcel = await credentialsAccessHTML(user);
        console.log('buffer: ', buffer)

        const message = {
            from: "marcusvini6277@gmail.com",
            to: "marcusvf.silva@outlook.com",
            subject: `Dottie - Credenciais de Acesso`,
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
    sendFirstAccess
};