// /pages/api/categories/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all categories
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } else if (req.method === 'POST') {
    // Create a new category
    const { name } = req.body;
    try {
      const newCategory = await prisma.category.create({
        data: {
            name,
        },
      });
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: 'Error creating category' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}