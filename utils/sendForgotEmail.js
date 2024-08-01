const nodemailer = require("nodemailer");

async function sendEmail(req, res) {
    try {
        const { email, subject, text } = req;
        console.log({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.EMAIL_PORT,
            secure: process.env.SECURE,
            user: process.env.USER,
            pass: process.env.PASS
        });

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

        transporter.verify((error, success) => {
            if (error) {
                console.error("Transporter verification failed:", error);
            } else {
                console.log("Transporter verified successfully:", success);
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = sendEmail;