import { TaskType } from "@/lib/mockData";
import {
  ArrowRightFromLine,
  ChevronRight,
  EllipsisVertical,
  Pencil,
  Trash,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuSubTrigger,
} from "@radix-ui/react-dropdown-menu";

const Task = ({ task }: { task: TaskType }) => {
  const handleMoveTask = () => {};

  const handleEdit = () => {};

  const handleDelete = () => {};

  const isMoveItemDisabled = (status: string) => {
    return task.status === status;
  };

  const MoveDropdownItem = ({
    status,
    text,
  }: {
    status: string;
    text: string;
  }) => {
    return (
      <DropdownMenuItem
        onClick={() => handleMoveTask()}
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
                <ChevronRight size={15} className="ml-auto" />
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="p-2 bg-background border-2 border-accent-3">
                  <MoveDropdownItem status="pending" text="Pending" />
                  <MoveDropdownItem status="inProgress" text="In Progress" />
                  <MoveDropdownItem status="completed" text="Completed" />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem className="task-dropdown-item">
              <Pencil size={15} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="task-dropdown-item">
              <Trash size={15} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Task;
