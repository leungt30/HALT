import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectToDatabase } from './db';
import { getLayout, saveLayout, LayoutItem } from './models/Layout';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // Allow all origins for now to fix the blockage
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

import { PRODUCTS } from './products';

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
