import Details from '@/models/Details';
import Token from '@/models/Token';
import User from '@/models/User';

export default async function handler(req, res) {
    const token = await Token.findOne({
        token: req.body.token2
    });
    console.log(token.userId)

    if (!token) {
        return res.status(401).json({ message: "Unauthorized1" })
    }

    let user;
    if (token) {
        user = await User.findOne({
            verify: true
        });
    }

    if (!user) {
        return res.status(401).json({ message: "Unauthorized2" });
    }

    console.log(user._id.toString())

    if (token.userId === user._id.toString() && req.method === "POST") {
        try {
            // Create a new details
            const details = await Details.create({
                ...req.body,
                user: user._id,
                relation,
                year,
                LoveTo,
                gender
            });
            return res.status(201).json({ success: true, details });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}