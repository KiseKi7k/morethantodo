import TasksContainer from "@/components/TasksContainer";
import { groupTasks } from "@/lib/mockData";
import React from "react";

async function TasksPage({ params }: { params: { id: string } }) {
  const group = groupTasks.find((g) => g.id === params.id);
  const tasks = group?.tasks;

  const pendingTasks = tasks?.filter((t) => t.status == "pending");
  const inProgressTasks = tasks?.filter((t) => t.status == "inProgress");
  const completedTasks = tasks?.filter((t) => t.status == "completed");

  return (
    <div className="flex flex-1 flex-col gap-12">
      <span className="font-bold text-4xl text-primary ml-12">
        | {group?.title}
      </span>

      <div className="flex flex-1">
        <div className="grid grid-cols-3 gap-20 mx-auto h-full">
          <TasksContainer
            tasks={pendingTasks || []}
            status="Pending"
            color="gray-500"
          />
          <TasksContainer
            tasks={inProgressTasks || []}
            status="In Progress"
            color="yellow-500"
          />
          <TasksContainer
            tasks={completedTasks || []}
            status="Completed"
            color="green-500"
          />
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
