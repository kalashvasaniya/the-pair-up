import User from '@/models/User';
import db from '@/middleware';

var CryptoJS = require("crypto-js");

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, email, password } = req.body;
            const user = await User.create({
                name,
                email,
                password: CryptoJS.AES.encrypt(password, "keykalash").toString()
            });
            res.status(200).json({ success: true, data: user });
        } catch (err) {
            res.status(400).json({ success: false, error: err });
        }
    }
}
