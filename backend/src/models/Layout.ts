import { getDatabase } from '../db';
import { BlockVariant } from '../products';

export interface LayoutItem {
    itemId: string;
    variant: BlockVariant;
}

export interface LayoutDocument {
    _id?: any; // MongoDB generates this
    items: LayoutItem[];
    createdAt: Date;
    flag?: string;
}

const COLLECTION_NAME = 'layouts';

// Default layout to use if none exists in database
const DEFAULT_LAYOUT: LayoutItem[] = [
    { itemId: 'p1', variant: 'single' },
    { itemId: 'p2', variant: 'single' },
    { itemId: 'p3', variant: 'single' },
    { itemId: 'p4', variant: 'single' },
    { itemId: 'p4', variant: 'double' },
    { itemId: 'p5', variant: 'double' },
    { itemId: 'p10', variant: 'flyer' },
];

export async function getLayout(): Promise<LayoutItem[]> {
    const db = getDatabase();
    const collection = db.collection<LayoutDocument>(COLLECTION_NAME);

    // Get the latest layout by creation time
    const doc = await collection.findOne({}, { sort: { createdAt: -1 } });

    if (!doc) {
        // Initialize with default layout if none exists
        await saveLayout(DEFAULT_LAYOUT);
        return DEFAULT_LAYOUT;
    }

    return doc.items;
}

export async function saveLayout(items: LayoutItem[]): Promise<void> {
    const db = getDatabase();
    const collection = db.collection<LayoutDocument>(COLLECTION_NAME);

    const doc: LayoutDocument = {
        items,
        createdAt: new Date(),
    };

    await collection.insertOne(doc);
}

export async function setFlag(flagName: string): Promise<boolean> {
    const db = getDatabase();
    const collection = db.collection<LayoutDocument>(COLLECTION_NAME);

    // Find the latest layout
    const latestDoc = await collection.findOne({}, { sort: { createdAt: -1 } });

    if (!latestDoc) {
        return false;
    }

    // Update the latest document with the flag
    await collection.updateOne(
        { _id: latestDoc._id },
        { $set: { flag: flagName } }
    );
    return true;
}

export async function getLayoutHistory(flagName?: string): Promise<LayoutDocument[]> {
    const db = getDatabase();
    const collection = db.collection<LayoutDocument>(COLLECTION_NAME);

    if (!flagName) {
        // "give you back all the layouts since latest till the flag"
        // We'll fetch all sorted by latest, and filter in application logic or use valid query if slightly complex
        // Ideally we fetch latest few, but we don't know how far the flag is.
        // Let's fetch all (assuming reasonable size) or use an aggregation.
        // Simple approach: Fetch all descending, iterate until we find a flag.

        const allDocs = await collection.find({}, { sort: { createdAt: -1 } }).toArray();
        const result: LayoutDocument[] = [];

        for (const doc of allDocs) {
            result.push(doc);
            if (doc.flag) {
                break; // Stop at the first flag encountered (the latest one)
            }
        }
        return result;
    } else {
        // "query for a specific flag it should give you all the layouts between the flag and the next set flag or latest"

        // 1. Find the target flag document
        const targetFlagDoc = await collection.findOne({ flag: flagName });
        if (!targetFlagDoc) {
            return [];
        }

        // 2. Find the next set flag (newer than target)
        // We look for a document with ANY flag that has creation time > target
        const nextFlagDoc = await collection.findOne(
            {
                createdAt: { $gt: targetFlagDoc.createdAt },
                flag: { $exists: true, $ne: null as any }
            },
            { sort: { createdAt: 1 } } // Get the earliest one after target
        );

        // 3. Query range
        const query: any = {
            createdAt: { $gte: targetFlagDoc.createdAt }
        };

        if (nextFlagDoc) {
            query.createdAt.$lte = nextFlagDoc.createdAt;
        }

        return collection.find(query, { sort: { createdAt: -1 } }).toArray();
    }
}
