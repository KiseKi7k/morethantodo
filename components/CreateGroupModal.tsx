"use client";

import React, { useState } from "react";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type FormType = {
  title: string;
  image: string;
};

const CreateGroupModal = () => {
  const [formData, setFormData] = useState<FormType>({
    title: "",
    image: "",
  });

  const handleCreate = () => {
    if (!formData.title || !formData.image) return;
  };

  const isButtonDisabled = () => {
    if (!formData.title) return true;
    return false;
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
            <DialogTitle className="font-bold">Create new group</DialogTitle>
          </DialogHeader>

          <Label>Title</Label>
          <Input
            id="title"
            type="text"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            value={formData.title}
            placeholder="Title"
          />
          <Label>
            Image <span className="font-light">(Optional)</span>
          </Label>
          <Input
            id="image"
            type="text"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.value }))
            }
            value={formData.image}
            placeholder="Image url"
          />

          <DialogFooter>
            <Button type="submit" disabled={isButtonDisabled()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateGroupModal;
