import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig"; // Pastikan import dbConfig dengan benar
import { Expenses, Categories } from "@/utils/schema"; // Pastikan untuk mengimpor schema yang benar
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // State untuk kategori

  // Ambil kategori dari database ketika komponen dimuat
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await db.select().from(Categories); // Ambil data kategori dari table
        setCategories(result); // Simpan data kategori dalam state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  /**
   * Add New Expense
   */
  const addNewExpense = async () => {
    setLoading(true);

    // Cari categoryId berdasarkan category name yang dipilih
    const selectedCategory = categories.find((cat) => cat.name === category);
    const categoryIdToUse = selectedCategory ? selectedCategory.id : null; // Jika tidak ditemukan, fallback ke null

    if (!categoryIdToUse) {
      toast.error("Please select a valid category.");
      setLoading(false);
      return; // Jika kategori tidak valid, hentikan proses
    }

    console.log("Final category ID to use:", categoryIdToUse);
    console.log("Sending to database:", {
      name,
      amount,
      categoryId: categoryIdToUse, // Gunakan categoryId, bukan category name
      date,
      budgetId,
      createdAt: moment().format("DD/MM/yyyy"),
    });

    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name.trim(),
          amount: parseFloat(amount),
          categoryId: categoryIdToUse, // Kirim categoryId
          date: date,
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
        setDate();
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
          type="number" // Ensures only numbers are entered
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