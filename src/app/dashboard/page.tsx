"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  const navigateToHistory = () => {
    router.push("/history");
  };

  const [showIncomeModal, setShowIncomeModal] = useState(false);

  const toggleIncomeModal = () => setShowIncomeModal(!showIncomeModal);

  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const toggleExpenseModal = () => setShowExpenseModal(!showExpenseModal);

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
      {/* Welcome */}
      <div className="mt-20 text-center">
        <h1 className="text-3xl font-bold">Welcome to Dashboard!</h1>
        </div>
      {/* Content */}
      <div className="flex-grow mt-10 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">
              Quick Actions
            </h3>
            <div className="flex gap-4">
              <button
                onClick={toggleIncomeModal}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded shadow-md"
              >
                + Add Income
              </button>
              <button
                onClick={toggleExpenseModal}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded shadow-md"
              >
                + Add Expense
              </button>
            </div>
          </div>
          {/* Modal Add Income */}
            {showIncomeModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
                    <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Add Income</h2>
                    <button onClick={toggleIncomeModal} className="text-gray-400 hover:text-white">
                        ×
                    </button>
                    </div>
                    <form>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Amount</label>
                        <input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Description</label>
                        <input
                        type="text"
                        placeholder="Enter description"
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                        type="button"
                        onClick={toggleIncomeModal}
                        className="mr-2 px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
                        >
                        Save changes
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            )}
          {/* Modal Add Expense */}
            {showExpenseModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
                    <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Add Expense</h2>
                    <button
                        onClick={toggleExpenseModal}
                        className="text-gray-400 hover:text-white"
                    >
                        ×
                    </button>
                    </div>
                    <form>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Amount</label>
                        <input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Description</label>
                        <input
                        type="text"
                        placeholder="Enter description"
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                        type="button"
                        onClick={toggleExpenseModal}
                        className="mr-2 px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
                        >
                        Save changes
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            )}
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