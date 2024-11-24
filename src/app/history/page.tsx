"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HistoryPage: React.FC = () => {
  const router = useRouter();

  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    // Load transactions from localStorage
    const storedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(storedTransactions);
  }, []);

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 px-4 py-3 shadow-md fixed top-0 w-full z-10">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <h1 className="text-lg font-bold">Money Manager - History</h1>
          <button
            onClick={handleBack}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
          >
            Back
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-grow mt-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-700 text-left">
              <thead className="bg-gray-800">
                <tr>
                  <th className="border border-gray-700 px-4 py-2 text-gray-300">Date</th>
                  <th className="border border-gray-700 px-4 py-2 text-gray-300">Description</th>
                  <th className="border border-gray-700 px-4 py-2 text-gray-300">Category</th>
                  <th className="border border-gray-700 px-4 py-2 text-gray-300">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-800">
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      {transaction.date}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      {transaction.purpose}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      {transaction.category || "N/A"}
                    </td>
                    <td
                      className={`border border-gray-700 px-4 py-2 ${
                        transaction.category === "expense" ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {transaction.category === "expense"
                        ? `-${transaction.amount}`
                        : `+${transaction.amount}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 mt-auto">
        <div className="text-center">
          <p>&copy; 2024 Money Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HistoryPage;
