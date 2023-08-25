import User from '@/models/User';
import Post from '@/models/Post';

export default async function handler(req, res) {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.method === 'GET') {
        try {
            const post = await Post.find({ user: user._id });
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
            let post = await Post.findOne({ user: user._id });
            if (post) {
                post.like = req.body.like;
                post.comment = req.body.comment;
                post.content = req.body.content;
                post.image = req.body.image;
                post.save();
                return res.status(200).json({ success: true, post });
            }
            else {
                post = await Post.create({
                    user: user._id,
                    like: req.body.like,
                    comment: req.body.comment,
                    content: req.body.content,
                    image: req.body.image,
                });
                return res.status(200).json({ success: true, post });
            }
        }
        catch (error) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    }
}