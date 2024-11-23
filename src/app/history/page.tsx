"use client";

import React from "react";
import { useRouter } from "next/navigation";

const HistoryPage: React.FC = () => {
  const router = useRouter();

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
          <ul className="space-y-3">
            <li className="bg-gray-800 p-4 rounded shadow">
              <p className="font-medium">Salary</p>
              <p className="text-green-400">+$2,500</p>
              <p className="text-sm text-gray-400">10 Nov 2024</p>
            </li>
            <li className="bg-gray-800 p-4 rounded shadow">
              <p className="font-medium">Grocery</p>
              <p className="text-red-400">-$200</p>
              <p className="text-sm text-gray-400">9 Nov 2024</p>
            </li>
            <li className="bg-gray-800 p-4 rounded shadow">
              <p className="font-medium">Electricity Bill</p>
              <p className="text-red-400">-$150</p>
              <p className="text-sm text-gray-400">8 Nov 2024</p>
            </li>
          </ul>
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
