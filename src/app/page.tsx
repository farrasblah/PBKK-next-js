"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  const navigateToHistory = () => {
    router.push("/history");
  };

  const addIncome = () => {
    // Tambahkan logika untuk Add Income di sini
    console.log("Add Income clicked");
  };

  const addExpense = () => {
    // Tambahkan logika untuk Add Expense di sini
    console.log("Add Expense clicked");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 px-4 py-3 shadow-md fixed top-0 w-full z-10">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <h1 className="text-lg font-bold">Money Manager</h1>
          <div className="flex gap-3">
            {/* Tombol History */}
            <button
              onClick={navigateToHistory}
              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
            >
              Transaction History
            </button>

            {/* Tombol Add Transaction */}
            <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">
              + Add Transaction
            </button>
          </div>
        </div>
      </nav>
      {/* Content */}
      <div className="flex-grow mt-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">
              Quick Actions
            </h3>
            <div className="flex gap-4">
              <button
                onClick={addIncome}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded shadow-md"
              >
                + Add Income
              </button>
              <button
                onClick={addExpense}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded shadow-md"
              >
                - Add Expense
              </button>
            </div>
          </div>
          {/* Balance Overview */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-300">Your Balance</h2>
            <p className="text-3xl font-bold text-green-400">$12,345.67</p>
          </div>

          {/* Financial Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-300">Income</h3>
              <p className="text-2xl font-bold text-green-400">$5,000</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-300">Expenses</h3>
              <p className="text-2xl font-bold text-red-400">$3,000</p>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-300">
              Recent Transactions
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex justify-between">
                <span>Salary</span>
                <span className="text-green-400">+$2,500</span>
              </li>
              <li className="flex justify-between">
                <span>Grocery</span>
                <span className="text-red-400">-$200</span>
              </li>
              <li className="flex justify-between">
                <span>Electricity Bill</span>
                <span className="text-red-400">-$150</span>
              </li>
            </ul>
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

export default Home;
