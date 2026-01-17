import 'dotenv/config';
import { connectToDatabase } from '../src/db';
import app from '../src/index';

export default async function handler(req: any, res: any) {
    await connectToDatabase();
    return app(req, res);
}
