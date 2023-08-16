import Details from '@/models/Details';
import User from '@/models/User';

export default async function handler(req, res) {
    try {
        const token = await User.findOne({
            token: User._id
        });
        console.log(token)

        const user = await User.findOne({
            verify: true
        });

        // If verified user is not found, return unauthorized
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Check if the request method is POST
        if (req.method === "POST") {
            try {
                // Create a new details record with the same user ID as token.userId and user._id
                const details = await Details.create({
                    user: token._id, // Ensure details.user matches token.userId
                    relation: req.body.relation,
                    year: req.body.year,
                    LoveTo: req.body.LoveTo,
                    gender: req.body.gender
                });
                console.log(details)
                // Return success response with created details record
                user.details = true;
                await user.save();
                return res.status(201).json({ success: true, details });
            } catch (err) {
                // Return error response if details creation fails
                return res.status(400).json({ message: err.message });
            }
        }
        else {
            // Return method not allowed if request method is not POST
            return res.status(405).json({ message: "Method Not Allowed" });
        }

    } catch (error) {
        // Return error response for any other unexpected errors
        return res.status(500).json({ message: "Internal Server Error" });
    }

}