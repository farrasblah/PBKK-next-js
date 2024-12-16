"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Savings } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateSavings({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [targetDate, setTargetDate] = useState();
  const [targetAmount, setTargetAmount] = useState();
  const [totalSaved, setTotalSaved] = useState();

  const { user } = useUser();

  /**
   * Used to Create New Savings
   */
  const onCreateSavings = async () => {
    const result = await db
      .insert(Savings)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
        targetDate: targetDate,
        targetAmount: targetAmount,
        totalSaved: totalSaved || 0,
      })
      .returning({ insertedId: Savings.id });
      console.log("Inserted Savings:", result);

    if (result) {
      refreshData();
      toast("New Savings Source Created!");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 dark:bg-gray-800 
               text-gray-700 dark:text-gray-200
               p-10 rounded-2xl items-center 
               flex flex-col border-2 border-dashed
               border-gray-300 dark:border-gray-600
               cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl dark:text-gray-200">+</h2>
            <h2 className="dark:text-gray-300">Create New Savings</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Savings</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Name</h2>
                  <Input
                    placeholder="e.g. House"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5000$"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Target Date</h2>
                  <Input
                    type="date"
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Target Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5000$"
                    onChange={(e) => setTargetAmount(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Total Saved</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 0"
                    onChange={(e) => setTotalSaved(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount && targetDate && targetAmount)}
                onClick={() => onCreateSavings()}
                className="mt-5 w-full rounded-full"
              >
                Create Savings
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateSavings;
