// /pages/api/transactions/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    // Create a new transaction
    const { type, amount, date, userId, categoryId } = req.body;
    // Validate the required fields
    if (!type || !amount || !date || !userId || !categoryId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Check if user and category exist
      const userExists = await prisma.user.findUnique({ where: { id: userId } });
      if (!userExists) {
        return res.status(400).json({ error: 'User does not exist' });
      }

      const categoryExists = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!categoryExists) {
        return res.status(400).json({ error: 'Category does not exist' });
      }

      // Create the new transaction
      const newTransaction = await prisma.transaction.create({
        data: {
          type,
          amount: parseFloat(amount),
          date: new Date(date), // Ensure date is in Date format
          userId,
          categoryId: parseInt(category, 10),
        },
      });
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Error creating transaction' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}