import User from '@/models/User';
import Token from '@/models/Token';
import sendEmail from '@/utils/sendEmail';
import CryptoJS from 'crypto-js';
var jwt = require('jsonwebtoken');
import jwt_decode from "jwt-decode";
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const token = req.headers.authorization; // Extract token from the authorization header
            var decoded = jwt_decode(token);

            if (decoded) {
                const user = await User.findOne({ email: decoded.email });

                if (user) {
                    const userDetails1 = {
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        tick: user.tick,
                    };
                    return res.status(200).json({ success: true, userDetails1 });
                }
            }

            return res.status(400).json({ success: false, message: 'User not found' });
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    }

    else {
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
                return res.status(401).json({ success: false, error: 'Email not verified. Another Verification link will be sent to your email address.' })
            }

            var token = jwt.sign({ name: user.name, email }, 'jwtsecret', { expiresIn: '2d' });
            // This is important in this situation
            res.status(200).json({ success: true, token, name: user.name, email: user.email, role: user.role, tick: user.tick });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
}
