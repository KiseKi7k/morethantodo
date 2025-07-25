import { TaskType } from "@/lib/mockData";
import { EllipsisVertical, Pencil, Trash, Trash2 } from "lucide-react";
import React from "react";
import { PopoverTrigger, Popover, PopoverContent } from "./ui/popover";
import { Separator } from "./ui/separator";

const Task = ({ task }: { task: TaskType }) => {
  return (
    <div className="relative w-[250px] aspect-[3/1] bg-background border-6 border-accent-3 rounded-xl p-2">
      <p className="text-xl overflow-clip">{task.title}</p>
      <div className="absolute top-2 right-[-4px] cursor-pointer">
        <Popover>
          <PopoverTrigger className="cursor-pointer">
            <EllipsisVertical />
          </PopoverTrigger>
          <PopoverContent className="w-30 p-2">
            <div className="flex flex-col gap-2 justify-center">
              <div className="group flex flex-row gap-2 p-1 items-center rounded-sm cursor-pointer transition-all duration-200 ease-out hover:bg-accent-1/60 hover:scale-105">
                <Pencil size={15} />
                Edit
              </div>
              <Separator />
              <div className="group flex flex-row gap-2 p-1 items-center rounded-sm cursor-pointer transition-all duration-200 ease-out hover:bg-accent-1/60 hover:scale-105">
                <Trash size={15} />
                Delete
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Task;
