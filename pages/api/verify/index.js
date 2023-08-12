import User from '@/models/User';
import Token from '@/models/Token';
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const user = await User.findOne({ _id: req.query.id });

            if (!user) {
                return res.status(400).json({ success: false, error: 'Invalid Link' });
            }

            // console.log(user._id)

            const token3 = await Token.findOne({
                userId: user._id,
                token2: req.query.token
            });
            // console.log(token3)

            if (!token3) {
                return res.status(400).json({ success: false, error: 'Invalid Link or Expired' });
            }

            // console.log("Clear")

            user.verify = true;
            await user.save();
            await token3.deleteOne();

            res.status(200).json({ success: true, data: 'Email Verified' });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}