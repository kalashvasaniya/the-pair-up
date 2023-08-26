import User from '@/models/User';
import Post from '@/models/Post';
import jwt_decode from "jwt-decode";

export default async function handler(req, res) {
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

    if (req.method === 'GET') {
        try {
            const post = await Post.find({ user: userss._id });
            if (post) {
                return res.status(200).json({ success: true, post });
            }
            return res.status(400).json({ success: false, message: 'Post not found' });
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    }
    else {
        try {
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