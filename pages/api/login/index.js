import User from '@/models/User';
import Token from '@/models/Token';
import sendEmail from '@/utils/sendEmail';
import CryptoJS from 'crypto-js';
var jwt = require('jsonwebtoken');
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({
                email
            });

            if (!user) {
                return res.status(400).json({ success: false, error: 'Invalid email or password' });
            }

            let originalText = CryptoJS.AES.decrypt(user.password, "keykalash").toString(CryptoJS.enc.Utf8);

            if (originalText !== password) {
                return res.status(400).json({ success: false, error: 'Invalid email or password' });
            }

            if (!user.verify) {
                const tokenValue = Date.now() + password;
                const token2 = await Token.create({
                    userId: user._id,
                    token2: tokenValue.toString()
                });

                const verifyUrl = `${process.env.NEXT_PUBLIC_HOST}/api/verify?id=${user._id}&token=${token2.token2}`;
                const message = `Please click on the link to verify your email: ${verifyUrl}`;

                // console.log(verifyUrl)

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
                return res.status(401).json({ success: false, error: 'Email not verified. Another Verification link will be sent to your email address.' })
            }

            var token = jwt.sign({ name: user.name, email }, 'jwtsecret', { expiresIn: '2d' });
            // This is important in this situation
            res.status(200).json({ success: true, token, name: user.name, email: user.email });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
