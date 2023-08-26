import User from '@/models/User';
import Post from '@/models/Post';
import jwt_decode from "jwt-decode";

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            // Use a regular expression to perform a case-insensitive search on the "content" field
            const regex = new RegExp(req.query.content, 'i');

            const posts = await Post.find({ content: regex });

            if (posts.length > 0) {
                return res.status(200).json({ success: true, posts });
            } else {
                return res.status(400).json({ success: false, message: 'No posts found matching the query' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    else {
        try {
            const token = req.headers.authorization; // Extract token from the authorization header
            var decoded = jwt_decode(token);

            let userss;

            if (decoded.email) {
                userss = await User.findOne({
                    email: decoded.email
                });
            } if (decoded.name) {
                userss = await User.findOne({
                    name: decoded.name
                });
            }

            if (!userss) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            console.log(userss)

            let post = await Post.findOne({ user: userss._id });

            post = await Post.create({
                user: userss._id,
                like: req.body.like,
                comment: req.body.comment,
                content: req.body.content,
                image: req.body.image,
            });
            console.log(post)
            return res.status(200).json({ success: true, post });

        }
        catch (error) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    }
}