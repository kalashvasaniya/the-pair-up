import User from '@/models/User';
import CryptoJS from 'crypto-js';
import sendEmail from '@/utils/sendEmail';
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const users = await User.find({
                email: req.body.email
            })

            const { password } = req.body;
            const encryptedPassword = CryptoJS.AES.encrypt(password, "keykalash").toString(); // Encrypt the password

            const user = await User.findByIdAndUpdate({
                _id: users[0]._id
            }, {
                password: encryptedPassword
            });

            const message = `Your password has been changed successfully, of E-mail ID - ${user.email}, If you did not change your password, please contact us immediately.`;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Password Change',
                    text: message
                });
            } catch (err) {
                await user.remove();
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
