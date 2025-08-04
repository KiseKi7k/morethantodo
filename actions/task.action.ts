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
    return {success: false, error: "Error adding task"}
  }
}

export const editTask = async (title: string, taskId: string) => {
  try {
    const task = await prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        title,
      }
    })
    
    revalidatePath('/group/')
    return {success: true, task}
  } catch (error) {
    console.error("Failed to edit task", error)
    return {success: false, error: "Error editing task"}
  }
}

export const moveTask = async (status: TaskStatus, taskId: string) => {
  try {
    const task = await prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        status
      }
    })
    
    revalidatePath('/group/')
    return {success: true, task}
  } catch (error) {
    console.error("Failed to move task", error)
    return {success: false, error: "Error moveing task"}
  }
}

export const deleteTask = async (taskId: string) => {
  try {
    await prisma.task.delete({
      where: {
        id: taskId
      }
    })
    
    revalidatePath('/group/')
    return {success: true}
  } catch (error) {
    console.error("Failed to delete task", error)
    return {success: false, error: "Error deleting task"}
  }
}
