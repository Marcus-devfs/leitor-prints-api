const sgMail = require('@sendgrid/mail')
require('dotenv').config();
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

exports.configEmailSendGrid = async (msg) => {
    try {
        await sgMail.send(msg, () => console.log({
            message: `Credentials sent to ${msg?.to}`,
        }));
        return true;
    } catch (error) {
        console.error('Objeto de erro completo:', error);
        return false;
    }
};
