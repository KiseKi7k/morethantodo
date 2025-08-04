'use client'

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { addTask } from "@/actions/task.action";
import { useParams } from "next/navigation";

const CreateTaskModal = ({ status }: { status: string }) => {
  const [title, setTitle] = useState("");
  const params = useParams();
  const id = params.id as string;

  const isButtonDisabled = () => {
    return title.trim() === "";
  };

  const handleCreate = async () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('status', status)

    const res = await addTask(formData, id)
    if (res.success) setTitle("")
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="hover:scale-105 transition-all duration-200 ease-out">
            <CirclePlus className="size-6" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">Create new task</DialogTitle>
          </DialogHeader>

          <Label className="font-semibold">Title</Label>
          <Input
            id="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={isButtonDisabled()}
                onClick={handleCreate}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskModal;
