const nodemailer = require('nodemailer');
require('dotenv').config();

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account Activation',
            html: 
                `
                <h1>Welcome to our Website!</h1>
                <p>Please click on the following link to activate your account:</p>
                <a href="${link}">Activate Account</a>
                <p>If you didn't request this activation, please ignore this email.</p>
                `
        })
    }
};

module.exports = new MailService();