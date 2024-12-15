import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState(""); // Initialize with empty string
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

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

  /**
   * Add New Expense
   */
  const addNewExpense = async () => {
    setLoading(true);
  
    const categoryToUse = category && category.trim() ? category : "Others";
  
    console.log("Final category to use:", categoryToUse);
    console.log("Sending to database:", {
      name,
      amount,
      category: categoryToUse,
      budgetId,
      createdAt: moment().format("DD/MM/yyyy"),
    });
  
    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name.trim(),
          amount: parseFloat(amount),
          category: categoryToUse,
          budgetId,
          createdAt: moment().format("DD/MM/yyyy"),
        })
        .returning();
  
      console.log("Database response:", result);
  
      if (result && result[0]) {
        toast.success("New Expense Added!");
        setName("");
        setAmount("");
        setCategory("");
        refreshData();
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="border p-5 rounded-2xl">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number" // Ensures only numbers are entered
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Category</h2>
        <select
          value={category}
          onChange={(e) => {const selectedCategory = e.target.value;
            console.log("Selected category (from dropdown):", selectedCategory);
            setCategory(selectedCategory);}}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={addNewExpense}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
