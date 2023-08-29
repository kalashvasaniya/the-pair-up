import User from '@/models/User';
import Post from '@/models/Post';
import jwt_decode from "jwt-decode";
import Details from '@/models/Details';

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            // Use a regular expression to perform a case-insensitive search on the "content" field
            const regex = new RegExp(req.query.content, 'i');

            const posts = await Post.find({
                content: regex
            })

            const userPost = await User.find({
                _id: posts.map((post) => post.user)
            })

            const userDetails = await Details.find({
                user: posts.map((post) => post.user)
            })

            if (posts.length > 0) {
                return res.status(200).json({ success: true, posts, userPost, userDetails });
            } else {
                return res.status(400).json({ success: false, message: 'No posts found matching the query' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    else if (req.method === 'POST') {
        try {
            const token = req.headers.authorization; // Extract token from the authorization header
            var decoded = jwt_decode(token);

            let userss;

            if (decoded.email) {
                userss = await User.findOne({ email: decoded.email });
            } else if (decoded.name) {
                userss = await User.findOne({ name: decoded.name });
            }


            if (!userss) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            let post = await Post.findOne({ user: userss._id });

            post = await Post.create({
                user: userss._id,
                like: req.body.like || 0,
                comment: req.body.comment || 0,
                content: req.body.content,
                image: req.body.image,
                slugPostLink: Date.now().toString() + Math.floor(Math.random() * 10000).toString(),
            });
            return res.status(200).json({ success: true, post });

        }
        catch (error) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    }

    else if (req.method === 'DELETE') {
        try {
            const token = req.headers.authorization; // Extract token from the authorization header
            var decoded = jwt_decode(token);

            let userssss;

            if (decoded.email) {
                userssss = await User.findOne({
                    email: decoded.email
                });
            } else if (decoded.name) {
                userssss = await User.findOne({
                    name: decoded.name
                });
            }

            if (!userssss) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const postToDelete = await Post.findOneAndDelete({
                user: userssss._id,
                slugPostLink: req.body.slugPostLink
            });

            if (!postToDelete) {
                return res.status(404).json({ message: "No post found to delete" });
            }

            return res.status(200).json({ success: true, post: postToDelete });
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }

    else {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}