"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getGroups = async () => {
  try {
    const groups = await prisma.group.findMany({
      orderBy: {
        createdAt: "asc",
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

export const editGroup = async (formData: FormData, groupId: string) => {
  try {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    const group = await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        title,
        image,
      },
    });

    revalidatePath("/");
    return { success: true, group };
  } catch (error) {
    console.error("Failed to edit group", error);
    return { success: false, error: "Error edit group" };
  }
};

export const deleteGroup = async (groupId: string) => {
  try {
    await prisma.group.delete({
      where: {
        id: groupId,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete group", error);
    return { success: false, error: "Error delete group" };
  }
};
