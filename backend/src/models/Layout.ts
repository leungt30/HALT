import { getDatabase } from '../db';
import { BlockVariant } from '../products';

export interface LayoutItem {
    itemId: string;
    variant: BlockVariant;
}

interface LayoutDocument {
    _id: string;
    items: LayoutItem[];
}

const LAYOUT_ID = 'store_layout';
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

    const doc = await collection.findOne({ _id: LAYOUT_ID });

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

    await collection.updateOne(
        { _id: LAYOUT_ID },
        { $set: { items } },
        { upsert: true }
    );
}
