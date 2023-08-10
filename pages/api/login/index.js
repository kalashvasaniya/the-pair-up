import User from '@/models/User';
import db from '@/middleware';

var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
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
        var token = jwt.sign({ name: user.name, email }, 'jwtsecret', { expiresIn: '2d' });
        res.status(200).json({ success: true, token });
    }
}