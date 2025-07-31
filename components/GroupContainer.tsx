"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GroupPageType } from "@/lib/mockData";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { deleteGroup, editGroup, getGroups } from "@/actions/group.action";

type EditGroupFormType = {
  title: string;
  image: string;
};

type Groups = Awaited<ReturnType<typeof getGroups>>;
type Group = Groups[number];

const GroupContainer = ({ group }: { group: Group }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [editedGroup, setEditedGroup] = useState<EditGroupFormType>({
    title: "",
    image: "",
  });

  const handleOpenEditDialog = () => {
    setEditedGroup({
      title: group.title,
      image: group.image || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleEditGroup = async () => {
    if (!editedGroup.title.trim()) return;

    const formData = new FormData();
    Object.entries(editedGroup).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await editGroup(formData, group.id);
    if (result.success) setIsDeleteDialogOpen(false);
  };
  const handleDeleteGroup = async () => {
    const res = await deleteGroup(group.id);
    if (res.success) setIsDeleteDialogOpen(false);
  };

  const isEditButtonDisabled = () => {
    return !editedGroup.title.trim();
  };

  return (
    <div className="group hover:scale-[105%] aspect-[1.5/1] h-50 lg:h-75 overflow-hidden rounded-xl border-2 transition-all duration-200 ease-out">
      <div className="relative h-full w-full">
        <Link href={`/group/${group.id}`}>
          <Image
            src={
              group.image ||
              "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
            }
            alt="Group img"
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute float bottom-0 bg-white/50 w-full h-[30%] z-10 p-2 lg:p-4">
            <p className="font-semibold text-primary text-xl lg:text-2xl">
              {group.title}
            </p>
            <div className="flex flex-row gap-3">
              <StatusCounter color="gray-500" count={group._count.pending} />
              <StatusCounter
                color="yellow-500"
                count={group._count.inProgress}
              />
              <StatusCounter color="green-500" count={group._count.completed} />
            </div>
          </div>
        </Link>
        <div className="absolute top-2 right-[-4px] cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 bg-background border-2 border-accent-3">
              <DropdownMenuItem
                className="task-dropdown-item"
                onClick={handleOpenEditDialog}
              >
                <Pencil size={15} className="text-black" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="task-dropdown-item"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash size={15} className="text-black" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle className="font-bold">Edit Group</DialogTitle>
          </DialogHeader>

          <Label>Title</Label>
          <Input
            id="title"
            type="text"
            onChange={(e) =>
              setEditedGroup((prev) => ({ ...prev, title: e.target.value }))
            }
            value={editedGroup.title}
            placeholder="Title"
          />
          <Label>
            Image <span className="font-light">(Optional)</span>
          </Label>
          <Input
            id="image"
            type="text"
            onChange={(e) =>
              setEditedGroup((prev) => ({ ...prev, image: e.target.value }))
            }
            value={editedGroup.image}
            placeholder="Image url"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={handleEditGroup}
                disabled={isEditButtonDisabled()}
              >
                Edit
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle className="font-bold">Delete Group</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-black">
            Are you sure to delete this group?
          </DialogDescription>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleDeleteGroup}>Delete</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupContainer;

const StatusCounter = ({ color, count }: { color: string; count: number }) => {
  return (
    <div
      className="flex flex-row text-sm lg:text-lg items-center font-semibold text-primary gap-1
            "
    >
      <span className={`text-${color}`}>•</span>
      {count}
    </div>
  );
};
