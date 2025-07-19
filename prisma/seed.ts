import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

type Group = {
  title: string;
  image?: string;
};

type Task = {
  title: string;
  status: "pending" | "inProgress" | "completed";
};

const groupToCreate: Group[] = [
  {
    title: "Study",
    image: "https://images6.alphacoders.com/117/1172068.jpg",
  },
  {
    title: "Projects",
  },
];

const studyTaskToAdd: Task[] = [
  {
    title: "Math",
    status: "pending",
  },
  {
    title: "Physic homework",
    status: "inProgress",
  },
  {
    title: "Math homework",
    status: "completed",
  },
  {
    title: "Thai homework",
    status: "completed",
  },
];

const projectsTaskToAdd: Task[] = [
  {
    title: "Finanace",
    status: "pending",
  },
  {
    title: "Oreo",
    status: "pending",
  },
];

(async () => {
  try {
    await prisma.$transaction(async (tx) => {
      // Add groups
      for (const group of groupToCreate) {
        await tx.group.create({
          data: group,
        });
      }

      // Add task to study group
      const studyGroup = await tx.group.findFirst({
        where: {
          title: "Study",
        },
      });

      if (!studyGroup) throw new Error("Error no study group");

      for (const task of studyTaskToAdd) {
        await tx.task.create({
          data: {
            ...task,
            groupId: studyGroup.id,
          },
        });
      }

      // Add task to projects group
      const projectsGroup = await tx.group.findFirst({
        where: {
          title: "Projects",
        },
      });

      if (!projectsGroup) throw new Error("Error no projects group");

      for (const task of studyTaskToAdd) {
        await tx.task.create({
          data: {
            ...task,
            groupId: projectsGroup.id,
          },
        });
      }
    });

    console.log("DB seed successfully");
  } catch (error) {
    console.error("Error seeding the db", error);
    throw error;
  }
})();
