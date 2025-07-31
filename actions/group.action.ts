"use server";

import { prisma } from "@/lib/prisma";

export const getGroups = async () => {
  try {
    const groups = await prisma.group.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    const taskCount = await prisma.task.groupBy({
      by: ["groupId", "status"],
      _count: {
        _all: true,
      },
    });

    const groupsWithCount = groups.map((group) => {
      const counts = {
        pending: 0,
        inProgress: 0,
        completed: 0,
      };

      taskCount
        .filter((task) => task.groupId === group.id)
        .forEach((t) => {
          counts[t.status] = t._count._all;
        });

      return {
        ...group,
        _count: counts,
      };
    });
    return groupsWithCount;
  } catch (error) {
    console.error("Failed to get groups", error);
    return [];
  }
};
