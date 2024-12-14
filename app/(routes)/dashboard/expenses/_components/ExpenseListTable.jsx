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

  useEffect(() => {
    if (selectedExpense) {
      setName(selectedExpense.name);
      setAmount(selectedExpense.amount);
    }
  }, [selectedExpense]);

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

  const updateExpense = async () => {
    const result = await db
      .update(Expenses)
      .set({
        name,
        amount,
      })
      .where(eq(Expenses.id, selectedExpense.id))
      .returning();

    if (result) {
      toast("Expense Updated!");
      refreshData();
      setSelectedExpense(null); // Close the modal
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.map((expense) => (
        <div
          key={expense.id}
          className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2"
        >
          <h2>{expense.name}</h2>
          <h2>{expense.amount}</h2>
          <h2>{expense.createdAt}</h2>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setSelectedExpense(expense)}
                  className="flex space-x-2 gap-2 rounded-full"
                >
                  <PenBox className="w-4" /> Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Expense</DialogTitle>
                  <DialogDescription>
                    <div className="mt-5">
                      <div className="mt-2">
                        <h2 className="text-black font-medium my-1">
                          Expense Name
                        </h2>
                        <Input
                          placeholder="e.g. Dinner"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mt-2">
                        <h2 className="text-black font-medium my-1">
                          Expense Amount
                        </h2>
                        <Input
                          type="number"
                          placeholder="e.g. 100"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
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
                      className="mt-5 w-full rounded-full"
                    >
                      Update Expense
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => deleteExpense(expense)}
              className="bg-red-500 text-white flex space-x-2 gap-2 rounded-full hover:bg-red-400"
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
