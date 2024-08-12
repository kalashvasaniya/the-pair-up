import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(req, res) {
  try {
    const { email, subject, text } = req;

    const { data, error } = await resend.emails.send({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // Update this line
      to: [email],
      subject: subject,
      text: text
    });

    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", data);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

export default sendEmail;
