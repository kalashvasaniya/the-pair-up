import User from '@/models/User'; // Your User model
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { slug } = req.query;

            // Query the database for all users
            const user = await User.find({ name: slug });

            // Return all users
            return res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        try {
            const { slug } = req.query;

            // Connect to the database
            // const connection = await db();
            console.log("hello")

            // Query the database for a user with the given slug
            const user = await User.findOne({ name: slug });
            console.log(user)

            if (user) {
                return res.status(200).json({ success: true, user });
            } else {
                // If the user does not exist, return an error
                return res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
