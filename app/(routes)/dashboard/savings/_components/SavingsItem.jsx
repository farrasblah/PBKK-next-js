"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash, PenBox, Plus } from "lucide-react";
import { toast } from "sonner";

function SavingsItem({ budget, onDelete, onUpdate, incomes }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [incomeId, setIncomeId] = useState("");

  // Update form state with the correct Savings details when editing starts
  useEffect(() => {
    if (isEditing) {
      setName(budget.name);
      setAmount(budget.amount);
      setTargetDate(budget.targetDate);
      setTargetAmount(budget.targetAmount);
      setIncomeId(budget.incomeId);
    }
  }, [isEditing, budget]);

  const handleUpdate = () => {
    onUpdate({ id: budget.id, name, amount, targetDate, targetAmount, incomeId
    });
    setIsEditing(false);
  };

  const handleAddAmount = async () => {
    const amountToAdd = parseFloat(amount);
    const updatedTotalSaved = (parseFloat(budget.totalSaved) || 0) + amountToAdd;
    
    // Update the budget with the new totalSaved
    await onUpdate({
      ...budget,
      totalSaved: updatedTotalSaved, // Update only the totalSaved value
    });
  
    setIsAdding(false);
    setAmount(""); // Reset the amount field after adding
  };
  
  const calculateProgressPerc = () => {
    const totalSaved = parseFloat(budget.totalSaved) || 0;
    const target = parseFloat(budget.targetAmount);
    const perc = (totalSaved / target) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  return (
    <div className="p-5 border rounded-2xl hover:shadow-md cursor-pointer h-[220px] relative">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">{budget?.icon}</h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">Target Date: {budget.targetDate}</h2>
          </div>
        </div>
        <div className="text-right">
          <h2 className="font-bold text-primary text-lg">
            ${parseFloat(budget.totalSaved || 0).toFixed(2)} / ${parseFloat(budget.targetAmount).toFixed(2)}
          </h2>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs text-slate-400">
            ${budget.totalSaved || 0} Saved
          </h2>
          <h2 className="text-xs text-slate-400">
            ${(parseFloat(budget.targetAmount) - parseFloat(budget.totalSaved || 0)).toFixed(2)} To Go
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full"
            style={{
              width: `${calculateProgressPerc()}%`,
            }}
          ></div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="absolute bottom-5 right-3 flex gap-2">
         {/* Add Amount Button */}
         <Button
            onClick={() => setIsAdding(true)} // Open the Add Amount Dialog
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-400"
          >
            <Plus className="w-4 h-4" /> Add
          </Button>

        {/* Edit Button */}
        <Button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500"
        >
          <PenBox className="w-4 h-4" /> Edit
        </Button>

        {/* Delete Button */}
        <Button
          onClick={() => onDelete(budget.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-400"
        >
          <Trash className="w-4 h-4" /> Delete
        </Button>
      </div>

      {/* Update Dialog */}
      {isEditing && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Savings</DialogTitle>
            </DialogHeader>
            <div>
              <h2>Source Name</h2>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. YouTube"
              />
              <h2>Amount to Add</h2>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 1000"
              />
            </div>
            <div className="mt-2">
              <h2>Target Date</h2>
              <Input
                type="date"
                value={targetDate}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <h2>Target Amount</h2>
              <Input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="e.g. 5000"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

        {/* Add Amount Dialog */}
        {isAdding && (
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Savings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h2 className="mb-2">Amount to Save</h2>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 1000"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddAmount}>Add to Savings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}

export default SavingsItem;
