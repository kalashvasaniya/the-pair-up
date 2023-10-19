import User from '@/models/User';
import LikeComment from '@/models/LikeComment';
import jwt_decode from "jwt-decode";
import db from '@/middleware';

export default async function handler(req, res) {

    const { commentId, postId } = req.body;

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

            if (!currentUser) {
                return res.status(404).json({ error: 'Current user not found' });
            }

            // Create a new follower relationship
            let likeComment = await LikeComment.findOneAndDelete({
                // comment: commentId,
                user: currentUser._id,
                like: postId
            });

            res.status(200).json({ message: 'Comment liked successfully', likeComment });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.
            status(405).
            json({ error: `Method ${req.method} not allowed` });
    }
}