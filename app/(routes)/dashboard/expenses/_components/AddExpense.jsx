import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Expenses, Categories } from "@/utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs"; // Clerk for user authentication
import { eq } from "drizzle-orm"; // Adjust this based on your ORM or query builder

function AddExpense({ budgetId, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // State for categories
  const { user } = useUser(); // Get the logged-in user

  useEffect(() => {
    console.log("Logged-in user:", user);
  }, [user]);

useEffect(() => {
  const fetchCategories = async () => {
    if (!user) return;

    try {
      console.log("Fetching categories for:", user.primaryEmailAddress?.emailAddress);
      const result = await db
        .select()
        .from(Categories)
        .where(eq(Categories.createdBy, user.primaryEmailAddress?.emailAddress));
      if (result.length === 0) {
        console.warn("No categories found for the user.");
        toast.info("No categories found. Please create one.");
      }
      setCategories(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error(`Failed to fetch categories: ${error.message}`);
    }
  };

  fetchCategories();
}, [user]);

  /**
   * Add New Expense
   */
  const addNewExpense = async () => {
    setLoading(true);

    // Find the categoryId based on the selected category name
    const selectedCategory = categories.find((cat) => cat.name === category);
    const categoryIdToUse = selectedCategory ? selectedCategory.id : null;

    if (!categoryIdToUse) {
      toast.error("Please select a valid category.");
      setLoading(false);
      return; // Stop the process if the category is invalid
    }

    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name.trim(),
          amount: parseFloat(amount),
          categoryId: categoryIdToUse,
          date,
          budgetId,
          createdAt: moment().format("DD/MM/yyyy"),
        })
        .returning();

      if (result && result[0]) {
        toast.success("New Expense Added!");
        setName("");
        setAmount("");
        setCategory("");
        setDate("");
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
        <h2 className="text-black dark:text-white font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Ice Cream"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black dark:text-white font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black dark:text-white font-medium my-1">Expense Category</h2>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-md bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Date</h2>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount && category && date) || loading}
        onClick={addNewExpense}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
