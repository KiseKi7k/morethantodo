"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getGroupWithTasks = async (groupId: string) => {
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        tasks: true,
      },
    });

    return group;
  } catch (error) {
    console.error("Failed to get tasks", error);
    return null;
  }
};
