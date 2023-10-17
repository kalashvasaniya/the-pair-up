import User from '@/models/User';
import Follower from '@/models/Follower';
import jwt_decode from "jwt-decode";
import db from '@/middleware';

export default async function handler(req, res) {

    const { userIdToFollow } = req.body;

    if (req.method === 'POST') {
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

            // You should also check if the userToFollow exists before proceeding.
            const userToFollow = await User.findOne({
                _id: userIdToFollow
            });

            if (!currentUser) {
                return res.status(404).json({ error: 'Current user not found' });
            }

            if (!userToFollow) {
                return res.status(404).json({ error: 'User to follow not found' });
            }

            // Check if the current user is already following the userToFollow
            const isFollowing = await Follower.exists({
                user: currentUser._id,
                // follower: currentUser._id, 
                following: userToFollow._id
            });

            if (isFollowing) {
                return res.status(400).json({ error: 'You are already following this user' });
            }

            // Create a new follower relationship
            let follower = await Follower.create({
                user: currentUser._id,
                // follower: currentUser._id, 
                following: userToFollow._id
            });

            res.status(200).json({ message: 'User followed successfully', follower });
        } catch (error) {
            console.error('Error following user:', error);
            res.status(500).json({ error: 'An error occurred', error });
        }
    } else if (req.method === 'GET') {
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
            console.log("currentUser", currentUser)

            if (!currentUser) {
                return res.status(404).json({ error: 'Current user not found' });
            }

            // Check if the current user is already following the userToFollow
            const isFollowings = await Follower.find({
                user: currentUser._id,
            });
            console.log("isFollowings", isFollowings)

            if (isFollowings) {
                return res.status(200).json({ success: true, isFollowings });
            } else {
                return res.status(200).json({ success: false, isFollowings });
            }
        } catch (error) {
            console.error('Error following user:', error);
            res.status(500).json({ error: 'An error occurred', error: error.message });
        }
    }
}
