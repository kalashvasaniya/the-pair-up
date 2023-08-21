import User from '@/models/User'; // Your User model
import Details from '@/models/Details'; // Your Details model
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        try {
            const { slug } = req.query;

            // Query the database for all users
            const user = await User.find({ name: slug });

            // Query the database for details
            const details = await Details.find({ user: user });

            // Return all users and details
            return res.status(200).json({ user, details });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
