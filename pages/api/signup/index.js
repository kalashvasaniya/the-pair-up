import { MongoClient, ObjectId } from 'mongodb';
import sendEmail from '@/utils/sendEmail';
import CryptoJS from 'crypto-js';
import db from '@/middleware';

let client;
let database;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        database = client.db(); // Use the database name specified in the URI
    }
    return database;
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, email, password } = req.body;
            const encryptedPassword = CryptoJS.AES.encrypt(password, "keykalash").toString(); // Encrypt the password

            const db = await connectToDatabase();
            const usersCollection = db.collection('users');
            const tokensCollection = db.collection('tokens');

            const user = {
                name,
                email,
                password: encryptedPassword,
                verify: false,
                details: false,
                tick: 'no',
                role: 'user',
                createdAt: new Date()
            };

            const userResult = await usersCollection.insertOne(user);
            const userId = userResult.insertedId;

            const tokenValue = Date.now() + password + Date.now();
            const token2 = {
                userId: userId,
                token2: tokenValue.toString(),
                createdAt: new Date()
            };

            await tokensCollection.insertOne(token2);

            const verifyUrl = `${process.env.NEXT_PUBLIC_HOST}/api/verify?id=${userId}&token=${token2.token2}`;
            const message = `Hello, ${user.name}

Thank you for signing up with The PairUp! Please click on the link below to verify your email:

${verifyUrl}

If you did not sign up for The PairUp, please ignore this email.

Best regards
The PairUp Team`;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Verify your email address',
                    text: message
                });
            } catch (err) {
                await usersCollection.deleteOne({ _id: ObjectId(userId) });
                await tokensCollection.deleteOne({ userId: ObjectId(userId) });
                return res.status(500).json({ success: false, error: err.message });
            }

            res.status(200).json({ success: true, data: user });
        } catch (err) {
            res.status(400).json({ success: false, error: "An error occurred" });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
