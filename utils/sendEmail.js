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

        // Instead of alert, use console.log or res.send
        console.log("Email sent successfully");
        res.send("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.send("Email not sent successfully", error);
    }
}

module.exports = sendEmail;
