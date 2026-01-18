import { getDatabase } from '../db';

export interface CustomerAction {
    actionType: string;
    actionSubject: string;
    sessionId: string;
    timestamp: Date;
}

const COLLECTION_NAME = 'CustomerActionData';

export async function saveCustomerAction(customerAction: CustomerAction): Promise<void> {
    const db = getDatabase();
    const collection = db.collection<CustomerAction>(COLLECTION_NAME);

    await collection.insertOne(customerAction);
}

export async function insertFlagAction(flag: string): Promise<void> {
    const db = getDatabase();
    const collection = db.collection<CustomerAction>(COLLECTION_NAME);

    const action: CustomerAction = {
        actionType: 'FLAG',
        actionSubject: flag,
        sessionId: 'system', // or unique ID for system events
        timestamp: new Date()
    };

    await collection.insertOne(action);
}

export async function getCustomerActions(flagName?: string): Promise<CustomerAction[]> {
    const db = getDatabase();
    const collection = db.collection<CustomerAction>(COLLECTION_NAME);

    if (!flagName) {
        // "give you back all the events since latest till the flag"
        // Find latest events descending

        const allDocs = await collection.find({}, { sort: { timestamp: -1 } }).toArray();
        const result: CustomerAction[] = [];

        for (const doc of allDocs) {
            result.push(doc);
            if (doc.actionType === 'FLAG') {
                break; // Stop at the first flag encountered
            }
        }
        return result;
    } else {
        // "query for a specific flag it should give you all the layouts between the flag and the next set flag or latest"

        // 1. Find the target flag document
        const targetFlagDoc = await collection.findOne({ actionType: 'FLAG', actionSubject: flagName });
        if (!targetFlagDoc) {
            return [];
        }

        // 2. Find the next set flag (newer than target)
        const nextFlagDoc = await collection.findOne(
            {
                timestamp: { $gt: targetFlagDoc.timestamp },
                actionType: 'FLAG'
            },
            { sort: { timestamp: 1 } } // Get the earliest one after target
        );

        // 3. Query range
        const query: any = {
            timestamp: { $gte: targetFlagDoc.timestamp }
        };

        if (nextFlagDoc) {
            query.timestamp.$lte = nextFlagDoc.timestamp;
        }

        return collection.find(query, { sort: { timestamp: -1 } }).toArray();
    }
}

