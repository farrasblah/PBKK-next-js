// /pages/api/budgets/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all budgets
    try {
      const budgets = await prisma.budgets.findMany(); // Use singular model name
      res.status(200).json(budgets);
    } catch (error) {
      console.error('Error fetching budgets:', error); // Log the error
      res.status(500).json({ error: 'Error fetching budgets' });
    }
  } else if (req.method === 'POST') {
    // Create a new budget
    const { amount, start_date, end_date, userId, categoryId } = req.body;

    // Validate input
    if (!amount || !start_date || !end_date || !userId || !categoryId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const newBudget = await prisma.budgets.create({ // Use singular model name
        data: {
          amount,
          start_date: new Date(start_date), // Ensure date is in Date format
          end_date: new Date(end_date), // Ensure date is in Date format
          userId,
          categoryId,
        },
      });
      res.status(201).json(newBudget);
    } catch (error) {
      console.error('Error creating budget:', error); // Log the error
      res.status(500).json({ error: 'Error creating budget' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}