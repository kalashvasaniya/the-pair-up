// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';

// // Not Required
// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//     return NextResponse.redirect(new URL('/', request.url));
// }
// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/afrojack',
// };

// mongoose.connect(process.env.MONGO_URI);
// const db = mongoose.connection;

// db.on('error', (error) => {
//     console.error('MongoDB connection error:', error);
// });

// db.once('open', () => {
//     console.log('Connected to MongoDB & The Goal is to Reach The PU');
// });

// export default db;

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

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB & The Goal is to Reach The PU');
        return client.db(); // Return the database instance
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

const db = connectToDatabase();

export default db;