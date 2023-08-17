import User from '@/models/User';
import Details from '@/models/Details';

export default async function handler(req, res) {
    try {
        const user = await User.findOne({
            verify: true
        });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (req.method === "POST") {
            try {
                let details = await Details.findOne({ user: user._id });

                if (details) {
                    // If details exist, update the fields instead of creating new
                    details.relation = req.body.relation;
                    details.year = req.body.year;
                    details.LoveTo = req.body.LoveTo;
                    details.gender = req.body.gender;
                    await details.save();
                } else {
                    // If details don't exist, create new
                    details = await Details.create({
                        user: user._id,
                        relation: req.body.relation,
                        year: req.body.year,
                        LoveTo: req.body.LoveTo,
                        gender: req.body.gender
                    });
                }

                user.details = true;
                await user.save();

                return res.status(201).json({ success: true, details });
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        } else {
            return res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}