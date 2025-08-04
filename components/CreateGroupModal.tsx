"use client";

import React, { useState } from "react";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createGroup } from "@/actions/group.action";

type FormType = {
  title: string;
  image: string;
};

const CreateGroupModal = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState<FormType>({
    title: "",
    image: "",
  });

  const handleCreate = async () => {
    if (!newGroup.title) return;

    const formData = new FormData();
    Object.entries(newGroup).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await createGroup(formData);
    if (res.success) setDialogOpen(false);
  };

  const isButtonDisabled = () => {
    if (!newGroup.title) return true;
    return false;
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger>
          <div className="hover:scale-105 transition-all duration-200 ease-out">
            <CirclePlus className="size-6" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">Create new group</DialogTitle>
          </DialogHeader>

          <Label>Title</Label>
          <Input
            id="title"
            type="text"
            onChange={(e) =>
              setNewGroup((prev) => ({ ...prev, title: e.target.value }))
            }
            value={newGroup.title}
            placeholder="Title"
          />
          <Label>
            Image <span className="font-light">(Optional)</span>
          </Label>
          <Input
            id="image"
            type="text"
            onChange={(e) =>
              setNewGroup((prev) => ({ ...prev, image: e.target.value }))
            }
            value={newGroup.image}
            placeholder="Image url"
          />

          <DialogFooter>
            <Button
              type="submit"
              disabled={isButtonDisabled()}
              onClick={handleCreate}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateGroupModal;
