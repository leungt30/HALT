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

