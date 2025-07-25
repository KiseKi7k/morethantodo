export type GroupPageType = {
  id: string;
  title: string;
  image?: string;
  count: {
    pending: number;
    inProgress: number;
    completed: number;
  };
};

export type Task = {
  id: string;
  title: string;
  status: "pending" | "inProgress" | "completed";
};

export type GroupTasks = {
  id: string;
  title: string;
  tasks: Task[];
};

export const groupsPage: GroupPageType[] = [
  {
    id: "1",
    title: "Study",
    image: "",
    count: {
      pending: 1,
      inProgress: 2,
      completed: 0,
    },
  },
  {
    id: "2",
    title: "Projects",
    image: "",
    count: {
      pending: 0,
      inProgress: 0,
      completed: 0,
    },
  },
];

export const groupTasks: GroupTasks[] = [
  {
    id: "1",
    title: "Study",
    tasks: [
      {
        id: "1",
        title: "Math",
        status: "pending",
      },
      {
        id: "2",
        title: "Physic",
        status: "inProgress",
      },
      {
        id: "3",
        title: "Oreo",
        status: "completed",
      },
    ],
  },
  {
    id: "2",
    title: "Projects",
    tasks: [
      {
        id: "4",
        title: "Minecraft",
        status: "inProgress",
      },
    ],
  },
];
