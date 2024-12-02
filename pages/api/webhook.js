import mysql from 'mysql2/promise';
import { Webhook } from 'svix';
import { buffer } from 'micro';
import dotenv from 'dotenv';

dotenv.config();

// Create a database pool for optimized connection reuse
const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const config = {
    api: {
        bodyParser: false, // Disable Next.js body parser
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const payloadString = (await buffer(req)).toString(); // Parse raw body
            const svixHeaders = req.headers;

            const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
            const evt = wh.verify(payloadString, svixHeaders);
            const { id, first_name, last_name } = evt.data;
            const eventType = evt.type;

            if (!id || !first_name || !last_name) {
                throw new Error('Missing required attributes');
            }

            if (eventType === 'user.created') {
                await dbPool.execute('INSERT INTO users (clerk_user_id, first_name, last_name) VALUES (?, ?, ?)', [id, first_name, last_name]);
                console.log('User saved to database');
            } else if (eventType === 'user.updated') {
                await dbPool.execute('UPDATE users SET first_name = ?, last_name = ? WHERE clerk_user_id = ?', [first_name, last_name, id]);
                console.log('User updated in database');
            } else if (eventType === 'user.deleted') {
                await dbPool.execute('DELETE FROM users WHERE clerk_user_id = ?', [id]);
                console.log('User deleted from database');
            }

            res.status(200).json({ success: true, message: 'Webhook received' });
        } catch (err) {
            console.error('Error processing webhook:', err.message);
            res.status(400).json({ success: false, message: err.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
