import User from '@/models/User';
import Token from '@/models/Token';
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const user = await User.findOne({ _id: req.body.id });
            if (!user) {
                return res.status(400).json({ success: false, error: 'Invalid Link' });
            }

            const token = await Token.findOne({
                user: user._id.toString(),
                token: req.body.token,
            });

            if (!token || token.expiresAt < Date.now()) {
                return res.status(400).json({ success: false, error: 'Invalid Link or Expired' });
            }

            user.isVerified = true;
            await user.save();

            await token.remove();
            res.status(200).json({ success: true, data: 'Email Verified' });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}