"use client";
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses, Categories } from '@/utils/schema'; // Import Categories schema
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import ExpenseListTable from './_components/ExpenseListTable';
import { useUser } from '@clerk/nextjs';

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories
  const { user } = useUser();

  // Fetch categories from the database when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await db.select().from(Categories); // Fetch categories
        setCategories(result); // Store categories in state
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch expenses when user is available
  useEffect(() => {
    if (user) {
      getAllExpenses();
    }
  }, [user]);

  /**
   * Fetch all expenses belonging to the user and include category names
   */
  const getAllExpenses = async () => {
    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          categoryId: Expenses.categoryId, // Fetch categoryId instead of category name
          date: Expenses.date,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(Expenses.id));

      // Add category names to expenses
      const expensesWithCategory = result.map((expense) => {
        const category = categories.find((cat) => cat.id === expense.categoryId);
        return {
          ...expense,
          category: category ? category.name : "Unknown", // Add category name
        };
      });

      setExpensesList(expensesWithCategory); // Update the state with the category names
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>

      <ExpenseListTable
        refreshData={getAllExpenses}
        expensesList={expensesList}
      />
    </div>
  );
}

export default ExpensesScreen;
