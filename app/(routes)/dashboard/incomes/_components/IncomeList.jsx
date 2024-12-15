"use client";
import React, { useEffect, useState } from "react";
import CreateIncomes from "./CreateIncomes";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Incomes, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import IncomeItem from "./IncomeItem";
import { toast } from "sonner";

function IncomeList() {
  const [incomelist, setIncomelist] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getIncomelist();
  }, [user]);

  const getIncomelist = async () => {
    const result = await db
      .select({
        ...getTableColumns(Incomes),
        totalSpend: sql`sum(${Expenses.amount}::numeric)`.mapWith(Number),
      })
      .from(Incomes)
      .leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
      .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Incomes.id)
      .orderBy(desc(Incomes.id));
    setIncomelist(result);
  };

  const handleDelete = async (id) => {
    await db.delete(Incomes).where(eq(Incomes.id, id));
    toast("Income deleted successfully!");
    getIncomelist();
  };

  const handleUpdate = async (updatedIncome) => {
    await db
      .update(Incomes)
      .set({ name: updatedIncome.name, amount: updatedIncome.amount, date: updatedIncome.date })
      .where(eq(Incomes.id, updatedIncome.id));
    toast("Income updated successfully!");
    getIncomelist();
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateIncomes refreshData={getIncomelist} />
        {incomelist.length > 0
          ? incomelist.map((budget, index) => (
              <IncomeItem
                key={index}
                budget={budget}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default IncomeList;
