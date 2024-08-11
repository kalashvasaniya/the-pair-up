const nodemailer = require("nodemailer");

async function sendEmail(req, res) {
    try {
        const { email, subject, text } = req.body; // Ensure you're accessing req.body

        if (!email || !subject || !text) {
            return res.status(400).json({ error: "Email, subject, and text are required" });
        }

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

        console.log("Email sent successfully");
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email" });
    }
}

module.exports = sendEmail;
