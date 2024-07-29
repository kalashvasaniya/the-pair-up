import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Not Required
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/afrojack',
};

const uri = process.env.MONGO_URI;
let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB & The Goal is to Reach The PU');
    }
    return client.db();
}

connectToDatabase().catch((error) => {
    console.error('MongoDB connection error:', error);
});

export default connectToDatabase;