import User from '@/models/User'; // Your User model
import Details from '@/models/Details'; // Your Details model
import Post from '@/models/Post';
import db from '@/middleware'; // Assuming you have a database connection module

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        try {
            const { slug } = req.query;

            // Query the database for users whose name starts with the provided slug
            const users = await User.find({
                name: { $regex: `^${slug}`, $options: 'i' }
            }); // Case-insensitive search

            // Query the database for details associated with the found users
            const details = await Details.find({
                user: { $in: users.map(user => user._id) }
            });

            const posts = await Post.find({
                user: { $in: users.map(user => user._id) }
            })

            // Return the matching users and their details
            return res.status(200).json({ "success": true, users, details, posts });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
