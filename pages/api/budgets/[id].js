// /pages/api/budget/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Fetch a single budget
    const budget = await prisma.budgets.findUnique({
      where: { id: Number(id) },
    });
    if (budget) {
      res.status(200).json(budget);
    } else {
      res.status(404).json({ error: 'budget not found' });
    }
  } else if (req.method === 'PUT') {
    // Update a budget
    const { amount, start_date, end_date, userId, categoryId } = req.body;

    // Validate input
    if (!amount || !start_date || !end_date || !userId || !categoryId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the budget exists
    const existingbudget = await prisma.budgets.findUnique({
      where: { id: Number(id) },
    });

    if (!existingbudget) {
      return res.status(404).json({ error: 'budget not found' });
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
      const updatedbudget = await prisma.budgets.update({
        where: { id: Number(id) },
        data: {
          amount: parseFloat(amount), // Ensure amount is a number
          start_date: new Date(start_date), // Ensure date is in Date format
          end_date: new Date(end_date), // Ensure date is in Date format
          userId: parseInt(userId), // Ensure userId is an integer
          categoryId: parseInt(categoryId), // Ensure categoryId is an integer
        },
      });
      res.status(200).json(updatedbudget);
    } catch (error) {
      console.error('Error updating budget:', error); // Log the error
      res.status(500).json({ error: 'Error updating budget' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a budget
    try {
      await prisma.budgets.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting budget' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}