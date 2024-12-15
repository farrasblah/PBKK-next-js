"use client";
import React, { useEffect, useState } from "react";
import CreateSavings from "./CreateSavings";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Savings, Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import SavingsItem from "./SavingsItem";
import { toast } from "sonner";

function SavingsList() {
  const [savingslist, setSavingslist] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getSavingslist();
  }, [user]);

  const getSavingslist = async () => {
    try {
      const result = await db
        .select({
          id: Savings.id,
          name: Savings.name,
          amount: Savings.amount,
          budgetName: Budgets.name,
        })
        .from(Savings)
        .leftJoin(Budgets, eq(Savings.budgetId, Budgets.id)) // Join sederhana
        .where(eq(Savings.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Savings.id)); // Tanpa GROUP BY
  
      setSavingslist(result);
    } catch (error) {
      console.error("Error fetching savings list:", error);
    }
  };
  
  
  const handleDelete = async (id) => {
    await db.delete(Savings).where(eq(Savings.id, id));
    toast("Savings deleted successfully!");
    getSavingslist();
  };

  const handleUpdate = async (updatedSavings) => {
    await db
      .update(Savings)
      .set({ name: updatedSavings.name, amount: updatedSavings.amount })
      .where(eq(Savings.id, updatedSavings.id));
    toast("Savings updated successfully!");
    getSavingslist();
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateSavings refreshData={getSavingslist} />
        {savingslist.length > 0
          ? savingslist.map((budget, index) => (
              <SavingsItem
                key={index}
                budget={budget}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                budgetName={budget.budgetName}
              />
            ))
          : [].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default SavingsList;
