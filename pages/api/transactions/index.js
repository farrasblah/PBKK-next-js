// /pages/api/transactions/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  
  if (req.method === 'GET') {
    // Fetch all transactions
    try {
      const transactions = await prisma.transaction.findMany();
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Error fetching transactions', message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      console.log("Received payload:", req.body);

      // Periksa payload
      const { type, amount, date, categoryId, userId } = req.body;

      if (!type || !amount || !date || !categoryId || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Proses data dan simpan ke database
      const savedTransaction = await prisma.transaction.create({
        data: {
          type,
          amount: parseFloat(amount), // Pastikan amount diubah menjadi angka
          date: new Date(date), // Pastikan date menjadi objek Date
          categoryId,
          userId,
        },
      });

      console.log("Saved transaction:", savedTransaction);
      return res.status(200).json(savedTransaction);
    } catch (error) {
      console.error("Error in handler:", error);
      return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}