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
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error sending email", details: error.message });
    }
}

module.exports = sendEmail;
