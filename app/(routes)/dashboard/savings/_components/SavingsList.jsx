"use client";
import React, { useEffect, useState } from "react";
import CreateSavings from "./CreateSavings";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Savings, Incomes } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import SavingsItem from "./SavingsItem";
import { toast } from "sonner";

function SavingsList() {
  const [savingslist, setSavingslist] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getSavingslist();
      getIncomes();
    }
  }, [user]);

  const getIncomes = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
        })
        .from(Incomes)
        .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Incomes.id));
      
      setIncomes(result);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };
  
  const getSavingslist = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Savings),
        })
        .from(Savings)
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
      .set({
        name: updatedSavings.name,
        amount: updatedSavings.amount,
        targetDate: updatedSavings.targetDate,
        targetAmount: updatedSavings.targetAmount,
        totalSaved: updatedSavings.totalSaved, // Ensure totalSaved is updated
      })
      .where(eq(Savings.id, updatedSavings.id));
  
    toast("Savings updated successfully!");
    getSavingslist(); // Re-fetch the savings list
    getIncomes(); // Re-fetch the incomes list if needed
  };
  

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateSavings refreshData={getSavingslist} />
        {savingslist.length > 0 ? (
          savingslist.map((savings, index) => (
            <SavingsItem
              key={index}
              budget={savings}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              incomes={incomes}
            />
          ))
        ) : (
          [1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default SavingsList;
