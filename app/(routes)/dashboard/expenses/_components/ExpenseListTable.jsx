"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash, PenBox } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState();
  
  const categories = [
    "Food",
    "Skincare",
    "Entertainment",
    "Utilities",
    "Supplies",
    "Transportation",
    "Healthcare",
    "Shopping",
    "Others",
  ];

  useEffect(() => {
    if (selectedExpense) {
      // Safely set category and fallback to "Others"
      setName(selectedExpense.name || "");
      setAmount(selectedExpense.amount || "");
      setCategory(
        selectedExpense?.category?.trim()
          ? selectedExpense.category
          : "Others"
      );
      setDate(selectedExpense.date || "");
    }
  }, [selectedExpense]);

  // Delete expense handler
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast("Expense Deleted!");
      refreshData();
    }
  };

  // Update expense handler
  const updateExpense = async () => {
    const categoryToUse =
      category && category.trim() ? category : "Others";
    const result = await db
      .update(Expenses)
      .set({
        name,
        amount,
        category: categoryToUse,
        date,
      })
      .where(eq(Expenses.id, selectedExpense.id))
      .returning();

    if (result) {
      toast("Expense Updated!");
      refreshData();
      setSelectedExpense(null); // Close modal
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg text-black dark:text-white">
        Latest Expenses
      </h2>
      {/* Table Header */}
      <div className="grid grid-cols-5 rounded-tl-xl rounded-tr-xl bg-slate-200 dark:bg-slate-800 p-2 mt-3">
        <h2 className="font-bold text-black dark:text-white">Name</h2>
        <h2 className="font-bold text-black dark:text-white">Amount</h2>
        <h2 className="font-bold text-black dark:text-white">Category</h2>
        <h2 className="font-bold text-black dark:text-white">Date</h2>
        <h2 className="font-bold text-black dark:text-white">Action</h2>
      </div>

      {/* Table Rows */}
      {expensesList.map((expense) => (
        <div
          key={expense.id}
          className="grid grid-cols-5 rounded-tl-xl rounded-tr-xl bg-slate-200 dark:bg-slate-800 p-2 mt-3"
        >
          <h2 className="dark:text-gray-300">{expense.name || "N/A"}</h2>
          <h2 className="dark:text-gray-300">{expense.amount || "0"}</h2>
          <h2 className="dark:text-gray-300">{expense.category?.trim() ? expense.category : "Others"}</h2>
          <h2 className="dark:text-gray-300">{expense.date || expense.createdAt}</h2>
          <div className="flex space-x-2">
            {/* Edit Button with Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setSelectedExpense(expense)}
                  className="flex space-x-2 gap-2 rounded-full dark:bg-blue-600 hover:dark:bg-blue-500"
                >
                  <PenBox className="w-4" /> Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="dark:bg-slate-800">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">
                    Update Expense
                  </DialogTitle>
                  <DialogDescription className="dark:text-gray-300">
                    <div className="mt-5">
                      {/* Expense Name */}
                      <div className="mt-2">
                        <h2 className="text-black dark:text-white font-medium my-1">
                          Expense Name
                        </h2>
                        <Input
                          placeholder="e.g. Dinner"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="dark:bg-slate-700 dark:text-white"
                        />
                      </div>
                      {/* Expense Amount */}
                      <div className="mt-2">
                        <h2 className="text-black dark:text-white font-medium my-1">
                          Expense Amount
                        </h2>
                        <Input
                          type="number"
                          placeholder="e.g. 100"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="dark:bg-slate-700 dark:text-white"
                        />
                      </div>
                      {/* Expense Category */}
                      <div className="mt-2">
                        <h2 className="text-black dark:text-white font-medium my-1">
                          Expense Category
                        </h2>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full p-2 rounded-md dark:bg-slate-700 dark:text-white"
                        >
                          <option value="" disabled>
                            Select Category
                          </option>
                          {categories.map((cat, index) => (
                            <option key={index} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Expense Date */}
                      <div className="mt-2">
                        <h2 className="text-black dark:text-white font-medium my-1">
                          Expense Date
                        </h2>
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="dark:bg-slate-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      disabled={!(name && amount)}
                      onClick={updateExpense}
                      className="mt-5 w-full rounded-full dark:bg-blue-600 hover:dark:bg-blue-500"
                    >
                      Update Expense
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Delete Button */}
            <Button
              onClick={() => deleteExpense(expense)}
              className="bg-red-500 dark:bg-red-700 text-white flex space-x-2 gap-2 rounded-full hover:bg-red-400 dark:hover:bg-red-600"
            >
              <Trash className="w-4 h-4" /> Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
