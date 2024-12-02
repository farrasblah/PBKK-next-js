// /pages/api/categories/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Fetch a single category
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } else if (req.method === 'PUT') {
    // Update a category
    const { name, type, userId } = req.body;

    // Validate input
    if (!name || !type || !userId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the category exists
    const existingcategory = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!existingcategory) {
      return res.status(404).json({ error: 'category not found' });
    }

    // Check if userId and categoryId exist
    const userExists = await prisma.users.findUnique({
      where: { id: Number(userId) },
    });
      
    if (!userExists) {
      return res.status(400).json({ error: 'User  does not exist' });
    }

    try {
      const updatedcategory = await prisma.category.update({
        where: { id: Number(id) },
        data: {
          name,
          type,
          userId: parseInt(userId), // Ensure userId is an integer
        },
      });
      res.status(200).json(updatedcategory);
    } catch (error) {
      console.error('Error updating category:', error); // Log the error
      res.status(500).json({ error: 'Error updating category' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a category
    try {
      await prisma.category.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting category' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}