"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function SavingsItem({ budget, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  // Update form state with the correct Savings details when editing starts
  useEffect(() => {
    if (isEditing) {
      setName(budget.name);
      setAmount(budget.amount);
    }
  }, [isEditing, budget]);

  const handleUpdate = () => {
    onUpdate({ id: budget.id, name, amount });
    setIsEditing(false);
  };

  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  return (
    <div className="p-5 border rounded-2xl hover:shadow-md cursor-pointer h-[200px] relative">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">{budget?.icon}</h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">{budget.totalItem} Item</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">${budget.amount}</h2>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-3 right-3 flex gap-2">
        <Button variant="outline" onClick={() => onDelete(budget.id)}>
          Delete
        </Button>
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          Update
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
              <h2 className="mt-3">Monthly Amount</h2>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5000"
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

export default SavingsItem;
