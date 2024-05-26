import User from '@/models/User';
import Token from '@/models/Token';
import sendEmail from '@/utils/sendEmail';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken'; // Updated import
import jwt_decode from "jwt-decode";
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const token = req.headers.authorization; // Extract token from the authorization header
            var decoded = jwt_decode(token);

            if (decoded) {
                let user;
                if (decoded.email) {
                    user = await User.findOne({ email: decoded.email });
                } else if (decoded.name) {
                    user = await User.findOne({ name: decoded.name });
                }

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
    } else {
        const { identifier, password } = req.body; // Updated variable name

        try {
            let user;

            // Determine whether the identifier is an email or username
            if (identifier.includes('@')) {
                user = await User.findOne({ email: identifier });
            } else {
                user = await User.findOne({ name: identifier });
            }

            if (!user) {
                return res.status(400).json({ success: false, error: 'Invalid email or username or password' });
            }

            let originalText = CryptoJS.AES.decrypt(user.password, "keykalash").toString(CryptoJS.enc.Utf8);

            if (originalText !== password) {
                return res.status(400).json({ success: false, error: 'Invalid email or username or password' });
            }

            if (!user.verify) {
                const tokenValue = Date.now() + password;
                const token2 = await Token.create({
                    userId: user._id,
                    token2: tokenValue.toString()
                });

                const verifyUrl = `${process.env.NEXT_PUBLIC_HOST}/api/verify?id=${user._id}&token=${token2.token2}`;
                const message = `Hello, ${user.name}

Thank you for signing up with The PairUp! Please click on the link below to verify your email:

${verifyUrl}

If you did not sign up for The PairUp, please ignore this email.

Best regards
The PairUp Team`;

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

            var token = jwt.sign({ name: user.name, email: user.email }, 'jwtsecret', { expiresIn: '2d' });

            res.status(200).json({ success: true, token, name: user.name, email: user.email, role: user.role, tick: user.tick });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
}