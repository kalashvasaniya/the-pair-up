import User from '@/models/User';
import Token from '@/models/Token';
import sendEmail from '@/utils/sendEmail';
import CryptoJS from 'crypto-js';
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

            const { name, email, password } = req.body;
            const encryptedPassword = CryptoJS.AES.encrypt(password, "keykalash").toString(); // Encrypt the password

            const user = await User.create({
                name,
                email,
                password: encryptedPassword
            });

            const tokenValue = Date.now() + password + Date.now();
            const token2 = await Token.create({
                userId: user._id,
                token2: tokenValue.toString()
            });

            const verifyUrl = `${process.env.NEXT_PUBLIC_HOST}/api/verify?id=${user._id}&token=${token2.token2}`;
            const message = `<p>Hello,</p>
            <p>Thank you for signing up with The PairUp! Please click on the link below to verify your email:</p>
            <a href="${verifyUrl}" class="bg-sky-400 hover:bg-sky-500 text-white font-medium px-4 py-2 rounded-lg inline-block mt-4">
            Verify Email
            </a>
            <p>If you did not sign up for The PairUp, please ignore this email.</p>
            <p>Best regards,<br />The PairUp Team</p>`;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Verify your email address',
                    text: message
                });
            } catch (err) {
                await user.remove();
                await token2.remove();
                return res.status(500).json({ success: false, error: err.message });
            }

            res.status(200).json({ success: true, data: user });
        } catch (err) {
            res.status(400).json({ success: false, error: "An error occurred" }); // Use a descriptive error message
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
