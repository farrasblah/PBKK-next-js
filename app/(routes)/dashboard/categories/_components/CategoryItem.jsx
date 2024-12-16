"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash, PenBox } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

function CategoryItem({ budget, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState(budget?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  const [name, setName] = useState("");

  // Update form state with the correct income details when editing starts
  useEffect(() => {
    if (isEditing) {
      setEmojiIcon(budget?.icon);
      setName(budget.name);
    }
  }, [isEditing, budget]);

  const handleUpdate = () => {
    onUpdate({ id: budget.id, name, icon });
    setIsEditing(false);
  };

  return (
    <div className="p-5 border rounded-2xl hover:shadow-md cursor-pointer h-[150px] relative max-w-72">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">{budget?.icon}</h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-5 flex gap-2">
        {/* Edit Button */}
        <Button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500"
        >
          <PenBox className="w-4 h-4" />
        </Button>

        {/* Delete Button */}
        <Button
          onClick={() => onDelete(budget.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-400"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>

      {/* Update Dialog */}
      {isEditing && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Category</DialogTitle>
            </DialogHeader>
            <div>
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
              <h2>Category Name</h2>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Foods"
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

export default CategoryItem;
