import User from '@/models/User';
import Forgot from '@/models/Forgot';
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const foundForgot = await Forgot.findOne({
                tokenForgot: req.query.token,
            });

            if (!foundForgot) {
                return res.status(400).json({ success: false, error2: foundForgot });
            }

            // Update the foundForgot object and then save it

            await foundForgot.save();
            res.setHeader('Location', `/user/forgot?token=${foundForgot.tokenForgot}`);
            res.status(302).end();
            res.status(200).json({ success: true, data: 'Email Verified' });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
