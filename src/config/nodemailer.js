const nodemailer = require("nodemailer");
require('dotenv').config();

exports.configEmail = async (message) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465, // Porta segura para SMTP (SSL/TLS)
            secure: true, // Use SSL/TLS
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            }
        });

        await transporter.sendMail(message);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
