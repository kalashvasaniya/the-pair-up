const nodemailer = require("nodemailer");

async function sendEmail(req, res) {
    try {
        const { email, subject, text } = req.body; // Access request body for parameters
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: "securesally@gmail.com",
                pass: "vmykykhgghqureai"
            }
        });

        await transporter.sendMail({
            from: "securesally@gmail.com",
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