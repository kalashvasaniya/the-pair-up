import User from '@/models/User';
import Token from '@/models/Token';
import sendEmail from '@/utils/sendEmail';
var CryptoJS = require("crypto-js");
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, email, password } = req.body;
            const user = await User.create({
                name,
                email,
                password: CryptoJS.AES.encrypt(password, "keykalash").toString()
            });

            console.log("1")

            const key = await Token.create({
                user: user._id,
                token: Date.now() + password
            });
            
            console.log("2")
            
            const verifyUrl = `${process.env.NEXT_PUBLIC_HOST}/api/verify?id=${key.user}&token=${key.token}`;
            const message = `Please click on the link to verify your email: <a href="${verifyUrl}">${verifyUrl}</a>`;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Verify your email address',
                    text: message
                });
            } catch (err) {
                await user.remove();
                await key.remove();
                return res.status(500).json({ success: false, error: err.message });
            }
            
            res.status(200).json({ success: true, data: user });
        } catch (err) {
            res.status(400).json({ success: false, error: "yeh wala" });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}