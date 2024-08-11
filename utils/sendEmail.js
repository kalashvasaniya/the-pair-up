const nodemailer = require("nodemailer");

async function sendEmail(req, res) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });
    const mailOptions = {
        from: process.env.USER,
        to: req.email,
        subject: req.subject,
        text: req.text,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (err) {
        console.log("Error sending email", err);
    }
}

module.exports = sendEmail;
