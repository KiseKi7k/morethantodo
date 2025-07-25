import { TaskType } from "@/lib/mockData";
import { EllipsisVertical } from "lucide-react";
import React from "react";

const Task = ({ task }: { task: TaskType }) => {
  return (
    <div className="relative w-[250px] aspect-[3/1] bg-background border-6 border-accent-3 rounded-xl p-2">
      <p className="text-xl overflow-clip">{task.title}</p>
      <div className="absolute top-2 right-[-4px] cursor-pointer">
        <EllipsisVertical />
      </div>
    </div>
  );
};

export default Task;
