import User from '@/models/User';
import Follower from '@/models/Follower';
import jwt_decode from "jwt-decode";
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userIdToUnfollow } = req.body;

    try {
        const token = req.headers.authorization; // Extract token from the authorization header
        var decoded = jwt_decode(token);

        let userss;

        if (decoded.email) {
            userss = await User.findOne({ email: decoded.email });
        } else if (decoded.name) {
            userss = await User.findOne({ name: decoded.name });
        }

        // You need to identify the current user using the appropriate property.
        // If you're using email as the identifier, you should make sure it's passed correctly in the request body.
        const currentUser = await User.findOne({
            _id: userss._id
        });

        const userToUnfollow = await User.findOne({
            _id: userIdToUnfollow
        });

        if (!currentUser) {
            return res.status(404).json({ error: 'Current user not found' });
        }

        if (!userToUnfollow) {
            return res.status(404).json({ error: 'User to unfollow not found' });
        }

        // Remove the follower relationship
        let follower = await Follower.findOneAndDelete({ 
            user: currentUser._id,
            // follower: currentUser._id, 
            following: userToUnfollow._id
         });

        res.status(200).json({ message: 'User unfollowed successfully', follower});
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}
