// pages/api/createUser .js
import pool from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { clerkUser_Id } = req.body;

        try {
            const [result] = await pool.query(
                'INSERT INTO users (clerk_user_id) VALUES (?, ?, ?, ?)',
                [clerkUser_Id]
            );

            res.status(201).json({ id: result.insertId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}