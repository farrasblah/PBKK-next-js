// /pages/api/transactions/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Fetch a single transaction
    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } else if (req.method === 'PUT') {
    // Update a transaction
    const { type, amount, date, userId, categoryId } = req.body;

    // Validate input
    if (!type || !amount || !date || !userId || !categoryId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the transaction exists
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });

    if (!existingTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Check if userId and categoryId exist
    const userExists = await prisma.users.findUnique({
      where: { id: Number(userId) },
    });

    const categoryExists = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });

    if (!userExists) {
      return res.status(400).json({ error: 'User  does not exist' });
    }

    if (!categoryExists) {
      return res.status(400).json({ error: 'Category does not exist' });
    }

    try {
      const updatedTransaction = await prisma.transaction.update({
        where: { id: Number(id) },
        data: {
          type,
          amount: parseFloat(amount), // Ensure amount is a number
          date: new Date(date), // Ensure date is in Date format
          userId: parseInt(userId), // Ensure userId is an integer
          categoryId: parseInt(categoryId), // Ensure categoryId is an integer
        },
      });
      res.status(200).json(updatedTransaction);
    } catch (error) {
      console.error('Error updating transaction:', error); // Log the error
      res.status(500).json({ error: 'Error updating transaction' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a transaction
    try {
      await prisma.transaction.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting transaction' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}