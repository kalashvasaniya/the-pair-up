import User from '@/models/User'; // Your User model
import Chat from '@/models/Chat';
import db from '@/middleware';

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { userIdToChat } = req.body;

        try {
            const token = req.headers.authorization; // Extract token from the authorization header
            var decoded = jwt_decode(token);

            let userss;

            if (decoded.email) {
                userss = await User.findOne({ email: decoded.email });
            } else if (decoded.name) {
                userss = await User.findOne({ name: decoded.name });
            }

            const currentUser = await User.findOne({
                _id: userss._id
            });

            if (!currentUser) {
                return res.status(404).json({ error: 'Current user not found' });
            }

            const userToChat = await User.findOne({
                _id: userIdToChat
            });

            if (!userToFollow) {
                return res.status(404).json({ error: 'User to follow not found' });
            }

            const chat = await Chat.create({
                user: currentUser._id,
                chatWith: userToChat._id,
                chatso: req.body.chatso,
            });
            res.status(200).json({ success: true, data: chat });
        } catch (error) {
            console.error('Error following user:', error);
            res.status(500).json({ error: 'An error occurred', error });
        }
    } else if (req.method === 'GET') {
        try {

        } catch (error) {

        }
    }
}
