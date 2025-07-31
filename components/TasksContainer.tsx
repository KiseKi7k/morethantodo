"use client";

import { TaskType } from "@/lib/mockData";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import Task from "./Task";
import CreateTaskModal from "./CreateTaskModal";

interface TasksContainerProps {
  tasks: TaskType[];
  color: string;
  status: string;
}

const TasksContainer = ({ tasks, color, status }: TasksContainerProps) => {
  return (
    <div className="flex flex-col gap-4 bg-accent-1 h-[700px] w-[300px] border-6 border-accent-2 rounded-xl ">
      <div className="flex flex-row gap-2 text-primary text-3xl font-semibold p-3">
        <span className={`text-${color}`}>•</span>
        {status}
        <CreateTaskModal status={status} />
      </div>

      <ScrollArea className="h-[600px] w-full overflow-clip">
        <div className="flex flex-col gap-2 items-center">
          {tasks.map((t) => (
            <Task task={t} key={t.id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TasksContainer;
