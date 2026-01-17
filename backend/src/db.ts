import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let database: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
    if (database) {
        return database;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI environment variable is not set');
    }

    try {
        client = new MongoClient(uri);
        await client.connect();
        database = client.db(); // Uses database name from connection string
        console.log('Connected to MongoDB');
        return database;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}

export function getDatabase(): Db {
    if (!database) {
        throw new Error('Database not initialized. Call connectToDatabase() first.');
    }
    return database;
}

export async function closeDatabase(): Promise<void> {
    if (client) {
        await client.close();
        client = null;
        database = null;
        console.log('Disconnected from MongoDB');
    }
}
