import { TaskType } from "@/lib/mockData";
import {
  ArrowRightFromLine,
  ChevronRight,
  EllipsisVertical,
  Pencil,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
import { deleteTask, editTask, moveTask } from "@/actions/task.action";
import { TaskStatus } from "@/lib/generated/prisma";

const Task = ({ task }: { task: TaskType }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  const handleMoveTask = async (status: TaskStatus) => {
    const res = await moveTask(status, task.id)
  };

  const handleEdit = async () => {
    if (task.title === editedTitle) return;
    const res = await editTask(editedTitle, task.id)
  };

  const handleDelete = async () => {
    const res = await deleteTask(task.id)
  };

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
    setEditedTitle(task.title);
  };

  const isMoveItemDisabled = (status: string) => {
    return task.status === status;
  };

  const MoveDropdownItem = ({
    status,
    text,
  }: {
    status: TaskStatus;
    text: string;
  }) => {
    return (
      <DropdownMenuItem
        onClick={() => handleMoveTask(status)}
        disabled={isMoveItemDisabled(status)}
        className={`task-dropdown-item !p-1 ${
          isMoveItemDisabled(status)
            ? "hover:!bg-accent-1/30 text-gray-700"
            : ""
        }`}
      >
        {text}
      </DropdownMenuItem>
    );
  };

  return (
    <div className="relative w-[250px] aspect-[3/1] bg-background border-6 border-accent-3 rounded-xl p-2">
      <p className="text-xl overflow-clip">{task.title}</p>
      <div className="absolute top-2 right-[-4px] cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2 bg-background border-2 border-accent-3">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="task-dropdown-item">
                <ArrowRightFromLine size={15} />
                Move
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="p-2 bg-background border-2 border-accent-3">
                  <MoveDropdownItem status="pending" text="Pending" />
                  <MoveDropdownItem status="inProgress" text="In Progress" />
                  <MoveDropdownItem status="completed" text="Completed" />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle className="font-bold">Edit task</DialogTitle>
          </DialogHeader>

          <Label className="font-semibold">Title</Label>
          <Input
            id="title"
            type="text"
            onChange={(e) => setEditedTitle(e.target.value)}
            value={editedTitle}
            placeholder="Title"
            className="bg-accent-3/50"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleEdit}>Edit</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle className="font-bold">Delete Task</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure to delete this task?
          </DialogDescription>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleDelete}>Delete</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Task;
