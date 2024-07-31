import User from '@/models/User'; // Your User model
import Chat from '@/models/Chat';
import jwt_decode from "jwt-decode";
import connect from '@/lib/db';

export default async function handler(req, res) {
    await connect(); // Ensure a database connection
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

            if (!userToChat) {
                return res.status(404).json({ error: 'User to follow not found' });
            }

            const chat = await Chat.create({
                user: currentUser._id,
                chatWith: userToChat,
                chatso: req.body.chatso,
            });

            res.status(200).json({ success: true, data: chat });
        } catch (error) {
            console.error('Error following user:', error);
            res.status(500).json({ error: 'An error occurred', error });
        }
    } else if (req.method === 'GET') {
        try {
            const regex = new RegExp(req.query.content, 'i');

            const users = await User.find({
                name: regex
            })

            const chateso = await Chat.find({
                user: users.map((user) => user._id)
            })

            if (chateso.length > 0) {
                return res.status(200).json({ success: true, chateso });
            } else {
                return res.status(400).json({ success: false, message: 'No followers found matching the query' });
            }
        } catch (error) {

        }
    }
}
