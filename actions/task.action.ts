"use server";

import { TaskStatus } from "@/lib/generated/prisma";
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

export const addTask = async (formData: FormData, groupId: string) => {
  try {
    const title = formData.get('title') as string
    const status = formData.get('status') as TaskStatus

    const task = await prisma.task.create({
      data: {
        groupId,
        title,
        status
      }
    })

    revalidatePath('/group/')
    return {success: true, task}
  } catch (error) {
    console.error("Failed to add task", error)
    return {success: false}
  }
}
