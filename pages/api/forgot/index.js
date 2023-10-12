import User from '@/models/User';
import Forgot from '@/models/Forgot';
import CryptoJS from 'crypto-js';
import sendForgotEmail from '@/utils/sendForgotEmail';

export default async function handler(req, res) {
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

            const verifyUrl = `${process.env.NEXT_PUBLIC_HOST}/api/verifyForgot?token=${forgot.tokenForgot}`;
            const message = `<p>Hello,</p>
            <p>Thank you for signing up with The PairUp! Please click on the link below to verify your email:</p>
            <a href="${verifyUrl}" class="bg-sky-400 hover:bg-sky-500 text-white font-medium px-4 py-2 rounded-lg inline-block mt-4">
            Verify Email
            </a>
            <p>If you did not sign up for The PairUp, please ignore this email.</p>
            <p>Best regards,<br />The PairUp Team</p>`;

            try {
                await sendForgotEmail({
                    email: user.email,
                    subject: 'Password Change',
                    text: message,
                });
                res.status(200).json({ success: true, data: forgot });
            } catch (err) {
                await User.findByIdAndRemove(users[0]._id); // Remove the user
                await forgot.remove(); // Remove the tokenForgot
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
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}
