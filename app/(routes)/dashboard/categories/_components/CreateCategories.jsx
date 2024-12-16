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
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Categories } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateCategories({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();

  const { user } = useUser();

  const onCreateCategories = async () => {
    const result = await db
      .insert(Categories)
      .values({
        name: name,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Categories.id });

    if (result) {
      refreshData();
      toast("New Category Created!");
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
            <h2 className="dark:text-gray-300">Create New Category</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
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
                  <h2 className="text-black font-medium my-1">Category Name</h2>
                  <Input
                    placeholder="e.g. Foods"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name)}
                onClick={() => onCreateCategories()}
                className="mt-5 w-full rounded-full"
              >
                Create Category
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateCategories;
