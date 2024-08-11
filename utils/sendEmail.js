const nodemailer = require("nodemailer");

async function sendEmail(req, res) {
    try {
        const { email, subject, text } = req;
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });
        alert("Email sent successfully")
    } catch (error) {
        alert("Error sending email:", error, email, subject, text);
    }
}

module.exports = sendEmail;
