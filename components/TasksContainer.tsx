"use client";

import { Task } from "@/lib/mockData";
import React from "react";

interface TasksContainerProps {
  tasks: Task[];
  color: string;
  status: string;
}

const TasksContainer = ({ tasks, color, status }: TasksContainerProps) => {
  return (
    <div className="bg-accent-1 h-[700px] w-[300px] border-6 border-accent-2 rounded-xl ">
      <div className="flex flex-row gap-2 text-primary text-3xl font-semibold p-3">
        <span className={`text-${color}`}>•</span>
        {status}
      </div>
    </div>
  );
};

export default TasksContainer;
