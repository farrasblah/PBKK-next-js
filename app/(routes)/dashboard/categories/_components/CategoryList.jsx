"use client";
import React, { useEffect, useState } from "react";
import CreateCategories from "./CreateCategories";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Categories, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import CategoryItem from "./CategoryItem";
import { toast } from "sonner";

function CategoryList() {
  const [Categorylist, setCategorylist] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getCategorylist();
  }, [user]);

  const getCategorylist = async () => {
    const result = await db
      .select({
        ...getTableColumns(Categories)
      })
      .from(Categories)
      .leftJoin(Expenses, eq(Categories.id, Expenses.budgetId))
      .where(eq(Categories.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Categories.id)
      .orderBy(desc(Categories.id));
    setCategorylist(result);
  };

  const handleDelete = async (id) => {
    await db.delete(Categories).where(eq(Categories.id, id));
    toast("Category deleted successfully!");
    getCategorylist();
  };

  const handleUpdate = async (updatedCategory) => {
    await db
      .update(Categories)
      .set({ name: updatedCategory.name, amount: updatedCategory.amount, date: updatedCategory.date })
      .where(eq(Categories.id, updatedCategory.id));
    toast("Category updated successfully!");
    getCategorylist();
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateCategories refreshData={getCategorylist} />
        {Categorylist.length > 0
          ? Categorylist.map((budget, index) => (
              <CategoryItem
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

export default CategoryList;
