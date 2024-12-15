"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo2";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
function Dashboard() {
   const { user } = useUser();

   const [budgetList, setBudgetList] = useState([]);
   const [incomeList, setIncomeList] = useState([]);
   const [expensesList, setExpensesList] = useState([]);
  
   useEffect(() => {
     user && getBudgetList();
   }, [user]);

   const getBudgetList = async () => {
     const result = await db
       .select({
         ...getTableColumns(Budgets),

         totalSpend: sql`sum(${Expenses.amount}::numeric)`.mapWith(Number),
         totalItem: sql`count(${Expenses.id})`.mapWith(Number),
       })
       .from(Budgets)
       .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
       .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
       .groupBy(Budgets.id)
       .orderBy(desc(Budgets.id));
     setBudgetList(result);
     getAllExpenses();
     getIncomeList();
   };

  const getIncomeList = async () => {
    try {
      if (!user) return;
      
      const result = await db
        .select({
          totalAmount: sql`sum(${Incomes.amount}::numeric)`.mapWith(Number),
        })
        .from(Incomes)
        .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress)); // Filter by user's email
      
      console.log("Corrected Total Income from DB:", result[0]?.totalAmount);
      setIncomeList([{ totalAmount: result[0]?.totalAmount || 0 }]); // Store the income for the logged-in user
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

   const getAllExpenses = async () => {
     const result = await db
       .select({
         id: Expenses.id,
         name: Expenses.name,
         amount: Expenses.amount,
         createdAt: Expenses.createdAt,
       })
       .from(Budgets)
       .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
       .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
       .orderBy(desc(Expenses.id));
     setExpensesList(result);
   };

  return (
    <div className="p-8 bg-">
      <h2 className="font-bold text-4xl">Hi, {user?.fullName} 👋</h2>
      <p className="text-gray-500">
        Lets Manage your money
      </p>

      <CardInfo budgetList={budgetList} incomeList={incomeList} />
    </div>
  );
}

export default Dashboard;
