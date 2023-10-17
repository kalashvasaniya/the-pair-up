import User from '@/models/User'; // Your User model
import Details from '@/models/Details'; // Your Details model
import Post from '@/models/Post';
import Follower from '@/models/Follower';
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        try {
            const { slug } = req.query;

            // Query the database for all users
            const user = await User.find({ name: slug });

            // Query the database for details
            const details = await Details.find({ user: user });

            const posts = await Post.find({
                user: { $in: user.map(user => user._id) }
            })

            const follower = await Follower.find({
                user: { $in: user.map(user => user._id) }
            })

            // Return all users and details
            return res.status(200).json({ "success": true, user, details, posts, follower });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
