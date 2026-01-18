import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectToDatabase } from './db';
import { getLayout, saveLayout, setFlag, getLayoutHistory, LayoutItem, LayoutDocument } from './models/Layout';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // Allow all origins for now to fix the blockage
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

import { PRODUCTS } from './products';
import { saveCustomerAction, insertFlagAction, getCustomerActions } from './models/CustomerAction';

// --- SSE Client Management ---
const sseClients: Response[] = [];

async function broadcastLayoutUpdate() {
    const layout = await getLayout();
    const data = JSON.stringify(layout);
    sseClients.forEach(client => {
        client.write(`data: ${data}\n\n`);
    });
    console.log(`Broadcast layout update to ${sseClients.length} clients`);
}

// --- Routes ---

// SSE endpoint for real-time layout updates
app.get('/api/events', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.flushHeaders();

    // Send initial layout
    const layout = await getLayout();
    res.write(`data: ${JSON.stringify(layout)}\n\n`);

    // Add to clients list
    sseClients.push(res);
    console.log(`SSE client connected. Total: ${sseClients.length}`);

    // Remove client on disconnect
    req.on('close', () => {
        const index = sseClients.indexOf(res);
        if (index !== -1) {
            sseClients.splice(index, 1);
        }
        console.log(`SSE client disconnected. Total: ${sseClients.length}`);
    });
});

app.get('/api/products', (req: Request, res: Response) => {
    // Return list of products
    const productList = Object.values(PRODUCTS);
    res.json(productList);
});

app.get('/api/layout', async (req: Request, res: Response) => {
    try {
        const layout = await getLayout();
        // Enrich layout items with product description
        const enrichedLayout = layout.map(item => {
            const product = PRODUCTS[item.itemId];
            return {
                ...item,
                description: product ? product.description : 'Unknown Product'
            };
        });
        res.json(enrichedLayout);
    } catch (error) {
        console.error('Error fetching layout:', error);
        res.status(500).json({ error: 'Failed to fetch layout' });
    }
});

app.post('/api/layout', async (req: Request, res: Response) => {
    const newLayout = req.body;
    if (!Array.isArray(newLayout)) {
        return res.status(400).json({ error: 'Layout must be an array' });
    }

    try {
        await saveLayout(newLayout as LayoutItem[]);
        console.log('Layout updated via API and saved to MongoDB');

        // Broadcast to all SSE clients
        await broadcastLayoutUpdate();

        res.json({ success: true, count: newLayout.length });
    } catch (error) {
        console.error('Error saving layout:', error);
        res.status(500).json({ error: 'Failed to save layout' });
    }
});

app.post('/api/flags', async (req: Request, res: Response) => {
    const { flag } = req.body;
    if (!flag || typeof flag !== 'string') {
        return res.status(400).json({ error: 'Flag must be a non-empty string' });
    }

    try {
        const layoutSuccess = await setFlag(flag);
        // Also insert flag into customer action stream
        await insertFlagAction(flag);

        if (layoutSuccess) {
            console.log(`Flag '${flag}' set on latest layout and event stream`);
            res.json({ success: true, flag });
        } else {
            // Even if no layout, we might still want to flag events? 
            // Strict interpretation: "use the same flag end point to also set flags in the event tracking stuff"
            // So we do both.
            res.status(404).json({ error: 'No layout found to flag, but event flag set (partial success?)' });
        }
    } catch (error) {
        console.error('Error setting flag:', error);
        res.status(500).json({ error: 'Failed to set flag' });
    }
});

app.post('/api/CustomerAction', async (req: Request, res: Response) => {

    try {
        const customerAction = req.body;
        // add current timestamp to body
        customerAction.timestamp = new Date();
        await saveCustomerAction(customerAction);
        res.json({ success: true });

    } catch (error) {
        console.error('Error sending customer actions:', error);
        res.status(500).json({ error: 'Failed to send customer actions' });
    }
});

app.get('/api/layouts/history', async (req: Request, res: Response) => {
    const flag = req.query.flag as string | undefined;

    try {
        const history = await getLayoutHistory(flag);
        res.json(history);
    } catch (error) {
        console.error('Error fetching layout history:', error);
        res.status(500).json({ error: 'Failed to fetch layout history' });
    }
});

app.get('/api/customer-actions', async (req: Request, res: Response) => {
    const flag = req.query.flag as string | undefined;

    try {
        const actions = await getCustomerActions(flag);
        res.json(actions);
    } catch (error) {
        console.error('Error fetching customer actions:', error);
        res.status(500).json({ error: 'Failed to fetch customer actions' });
    }
});

app.get('/', (req, res) => {
    res.send('HALT Backend API Running');
});

// --- Start ---
async function startServer() {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    startServer();
}

export default app;
