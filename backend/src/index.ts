import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- Types ---
type BlockVariant = 'single' | 'double' | 'flyer';

interface LayoutItem {
    itemId: string;
    variant: BlockVariant;
}

// --- In-Memory Store ---
// Default initial data matches the frontend's static data for now
let currentLayout: LayoutItem[] = [
    { itemId: 'p1', variant: 'single' },
    { itemId: 'p1', variant: 'double' },
    { itemId: 'p1', variant: 'flyer' },
    { itemId: 'p2', variant: 'single' },
    { itemId: 'p2', variant: 'double' },
    { itemId: 'p2', variant: 'flyer' },
    { itemId: 'p3', variant: 'single' },
    { itemId: 'p3', variant: 'double' },
    { itemId: 'p3', variant: 'flyer' },
    { itemId: 'p4', variant: 'single' },
    { itemId: 'p4', variant: 'double' },
    { itemId: 'p4', variant: 'flyer' },
    { itemId: 'p5', variant: 'single' },
    { itemId: 'p5', variant: 'double' },
    { itemId: 'p5', variant: 'flyer' },
    { itemId: 'p6', variant: 'single' },
    { itemId: 'p6', variant: 'double' },
    { itemId: 'p6', variant: 'flyer' },
    { itemId: 'p7', variant: 'single' },
    { itemId: 'p7', variant: 'double' },
    { itemId: 'p7', variant: 'flyer' },
    { itemId: 'p8', variant: 'single' },
    { itemId: 'p8', variant: 'double' },
    { itemId: 'p8', variant: 'flyer' },
    { itemId: 'p9', variant: 'single' },
    { itemId: 'p9', variant: 'double' },
    { itemId: 'p9', variant: 'flyer' },
    { itemId: 'p10', variant: 'single' },
    { itemId: 'p10', variant: 'double' },
    { itemId: 'p10', variant: 'flyer' },
];

// --- Routes ---

app.get('/api/layout', (req: Request, res: Response) => {
    res.json(currentLayout);
});

app.post('/api/layout', (req: Request, res: Response) => {
    const newLayout = req.body;
    if (!Array.isArray(newLayout)) {
        return res.status(400).json({ error: 'Layout must be an array' });
    }
    // Basic validation could go here
    currentLayout = newLayout;
    console.log('Layout updated via API');
    res.json({ success: true, count: currentLayout.length });
});

app.get('/', (req, res) => {
    res.send('HALT Backend API Running');
});

// --- Start ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
