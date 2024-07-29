const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
let client;
let db;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db();  // Use the database name specified in the URI
    }
    return db;
}

const userSchema = {
    name: {
        type: 'string',
        required: true,
        unique: true,
        maxlength: 50,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
        maxlength: 50,
    },
    password: {
        type: 'string',
        required: true,
        maxlength: 50,
    },
    verify: {
        type: 'boolean',
        default: false,
    },
    details: {
        type: 'boolean',
        default: false,
    },
    tick: {
        type: 'string',
        enum: ['no', 'yes', 'active'],
        default: 'no',
    },
    role: {
        type: 'string',
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: 'date',
        default: new Date(),
    }
};

async function createUser(data) {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    const user = {
        ...data,
        createdAt: new Date()
    };

    try {
        const result = await collection.insertOne(user);
        console.log('User created:', result.ops[0]);
        return result.ops[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

module.exports = { createUser, connectToDatabase };
