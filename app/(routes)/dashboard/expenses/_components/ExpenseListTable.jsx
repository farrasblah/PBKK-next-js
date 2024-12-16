"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/utils/dbConfig";
import { Expenses, Categories } from "@/utils/schema"; // Tambahkan Category Schema
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
  const [category, setCategory] = useState(""); // State untuk kategori (store categoryId)
  const [date, setDate] = useState();
  const [categories, setCategories] = useState([]); // State untuk kategori dari DB

  // Ambil data kategori dari database saat komponen dimuat
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await db.select().from(Categories); // Ambil data dari tabel kategori
        setCategories(result); // Simpan ke state
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Ambil data pengeluaran dari database dan gabungkan dengan kategori
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expensesResult = await db
          .select()
          .from(Expenses)
          .leftJoin(Categories, eq(Expenses.categoryId, Categories.id)); // Join dengan tabel kategori
        setExpensesList(expensesResult); // Simpan data pengeluaran
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // Isi form saat modal edit dibuka
  useEffect(() => {
    if (selectedExpense) {
      setName(selectedExpense.name || "");
      setAmount(selectedExpense.amount || "");
      setCategory(selectedExpense.categoryId || ""); // Set categoryId
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
    const result = await db
      .update(Expenses)
      .set({
        name,
        amount,
        categoryId: category, // Use categoryId for update
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
          className="grid grid-cols-5 bg-slate-200 dark:bg-slate-800 p-2 mt-3 rounded"
        >
          <h2 className="dark:text-gray-300">{expense.name || "N/A"}</h2>
          <h2 className="dark:text-gray-300">{expense.amount || "0"}</h2>
          <h2 className="dark:text-gray-300">
            {categories.find((cat) => cat.id === expense.categoryId)?.name || "Others"}
          </h2> {/* Display category name */}
          <h2 className="dark:text-gray-300">{expense.date || "N/A"}</h2>
          <div className="flex space-x-2">
            {/* Edit Button */}
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
                    {/* Expense Form */}
                    <div className="mt-5">
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
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
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
                <DialogFooter>
                  <Button
                    disabled={!(name && amount)}
                    onClick={updateExpense}
                    className="mt-5 w-full rounded-full dark:bg-blue-600 hover:dark:bg-blue-500"
                  >
                    Update Expense
                  </Button>
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
