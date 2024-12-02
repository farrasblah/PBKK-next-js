import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
};

export default async function handler(req, res) {
    const db = await dbConnection();

    switch (req.method) {
        case 'GET': // Get all users
            const [users] = await db.query('SELECT * FROM users');
            res.status(200).json(users);
            break;
        
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    await db.end(); // Close the database connection
}
