import User from '@/models/User';
import Details from '@/models/Details';
import jwt_decode from "jwt-decode";

export default async function handler(req, res) {
    try {
        const token = req.headers.authorization; // Extract token from the authorization header
        var decoded = jwt_decode(token);

        const users = await User.findOne({
            email: decoded.email
        });

        if (!users) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (req.method === 'GET') {
            try {
                const user2 = await Details.findOne({
                    user: users._id
                });

                if (user2) {
                    const userDetails2 = {
                        bio: user2.bio,
                        gender: user2.gender,
                        relation: user2.relation,
                        year: user2.year,
                        LoveTo: user2.LoveTo,
                    };
                    return res.status(200).json({ success: true, userDetails2 });
                }

                return res.status(400).json({ success: false, message: 'User not found' });
            } catch (error) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
        }

        else {
            try {
                let details = await Details.findOne({
                    user: users._id
                });

                if (details) {
                    // If details exist, update the fields instead of creating new
                    details.bio = req.body.bio;
                    details.relation = req.body.relation;
                    details.year = req.body.year;
                    details.LoveTo = req.body.LoveTo;
                    details.gender = req.body.gender;
                    await details.save();
                } else {
                    // If details don't exist, create new
                    details = await Details.create({
                        user: users._id,
                        bio: req.body.bio,
                        relation: req.body.relation,
                        year: req.body.year,
                        LoveTo: req.body.LoveTo,
                        gender: req.body.gender
                    });
                }

                users.details = true;
                await users.save();

                return res.status(201).json({ success: true, details });
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}