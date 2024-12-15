"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash, PenBox } from "lucide-react";

function IncomeItem({ budget, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // Update form state with the correct income details when editing starts
  useEffect(() => {
    if (isEditing) {
      setName(budget.name);
      setAmount(budget.amount);
      setDate(budget.date);
    }
  }, [isEditing, budget]);

  const handleUpdate = () => {
    onUpdate({ id: budget.id, name, amount, date });
    setIsEditing(false);
  };

  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  return (
    <div className="p-5 border rounded-2xl hover:shadow-md cursor-pointer h-[160px] relative">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">{budget?.icon}</h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">{budget.date}</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">${budget.amount}</h2>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-5 right-3 flex gap-2">
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
              <DialogTitle>Update Income</DialogTitle>
            </DialogHeader>
            <div>
              <h2>Source Name</h2>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. YouTube"
              />
              <h2 className="mt-3">Amount</h2>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5000"
              />
            </div>
            <div className="mt-2">
              <h2>Date</h2>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default IncomeItem;
