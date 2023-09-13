import User from '@/models/User';
import Post from '@/models/Post';
import jwt_decode from "jwt-decode";

export default async function handler(req, res) {
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


            if (!userss) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            let post = await Post.findOne({ user: userss._id });

            post = await Post.updateOne({
                like: req.body.like,
            });
            return res.status(200).json({ success: true, post });

        }
        catch (error) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    }

    else {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}