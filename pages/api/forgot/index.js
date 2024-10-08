import User from '@/models/User';
import Forgot from '@/models/Forgot';
import CryptoJS from 'crypto-js';
import sendEmail from '@/utils/sendEmail';
import connect from '@/lib/db';

export default async function handler(req, res) {
    await connect(); // Ensure a database connection
    if (req.method === 'POST') {
        try {
            const users = await User.find({ email: req.body.email });

            if (users.length === 0) {
                return res.status(404).json({ success: false, error: "User not found" });
            }

            const { password } = req.body;
            const encryptedPassword = CryptoJS.AES.encrypt(password, "keykalash").toString();

            const user = await User.findByIdAndUpdate(users[0]._id, { password: encryptedPassword });

            const tokenValue = Date.now() + Date.now();
            const forgot = await Forgot.create({
                user: user._id,
                email: req.body.email,
                tokenForgot: tokenValue.toString(),
            });

            const verifyUrl = `https://www.thepairup.in/api/verifyForgot?token=${forgot.tokenForgot}`;
            const message = `Hello,

Thank you for choosing The PairUp! Please click the link below to reset your password:

${verifyUrl}

If you didn't register for The PairUp, please ignore this email.

Best regards

The PairUp Team`;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Password Change',
                    text: message,
                });
                res.status(200).json({ success: true, data: forgot });
            } catch (err) {
                await forgot.deleteOne(); // Remove the tokenForgot
                res.status(500).json({ success: false, error: err.message });
            }
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    } else if (req.method === 'PUT') {
        try {
            const foundForgot = await Forgot.findOne({
                tokenForgot: req.query.token,
            });

            if (!foundForgot) {
                return res.status(400).json({ success: false, error: "Invalid or expired token" });
            }

            const { password } = req.body;
            const encryptedPassword = CryptoJS.AES.encrypt(password, "keykalash").toString();

            const user = await User.findByIdAndUpdate(
                foundForgot.user,
                { password: encryptedPassword }
            );

            if (!user) {
                return res.status(500).json({ success: false, error: "Failed to update password" });
            }

            await user.save();
            await foundForgot.deleteOne();
            res.status(200).json({ success: true, message: "Password updated successfully" });

            const message = `Password Changed Successfully..... for Email - ${user.email}`;

            await sendEmail({
                email: user.email,
                subject: 'Password Change',
                text: message,
            });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}
