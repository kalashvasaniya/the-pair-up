import User from '@/models/User';
import Post from '@/models/Post';
import LikeComment from '@/models/LikeComment';

import jwt_decode from "jwt-decode";
import connect from '@/lib/db';

export default async function handler(req, res) {
    await connect(); // Ensure a database connection

    const { postId } = req.body;

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

            const userToLike = await Post.findOne({
                _id: postId
            });

            if (!userToLike) {
                return res.status(404).json({ error: 'User to like not found' });
            }

            const likeCommentCheck = await LikeComment.exists({
                // comment: commentId,
                user: currentUser._id,
                like: postId
            });

            if (likeCommentCheck) {
                return res.status(400).json({ error: 'You are already Like this Post' });
            }

            // Create a new follower relationship
            let likeComment = await LikeComment.create({
                // comment: commentId,
                user: currentUser._id,
                like: postId
            });

            res.status(200).json({ message: 'Comment liked successfully', likeComment });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server error' });
        }
    } else if (req.method === 'GET') {
        try {
            const regex = new RegExp(req.query.content, 'i');

            const users = await User.find({
                name: regex
            })

            const likecomments = await LikeComment.find({
                user: users.map((user) => user._id)
            })

            if (likecomments.length > 0) {
                return res.status(200).json({ success: true, likecomments });
            } else {
                return res.status(400).json({ success: false, message: 'No followers found matching the query' });
            }
        } catch (error) {
            console.error('Error fetching followers:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}