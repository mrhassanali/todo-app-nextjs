"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { TODOS } from "@/lib/constants/Route";

// get all todo from database

export async function getAllTodo() {
  try {
    const response = await prisma.todo.findMany({
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        title: true,
        completed: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response ?? [];
  } catch (e) {
    console.log(e);
    return [];
  }
}

// add todo to database

export async function addTodo(title: string, completed: boolean) {
  try {
    await prisma.todo.create({
      data: {
        title: title,
        completed: completed,
        updatedAt: new Date(),
      },
    });

    revalidatePath(TODOS);
  } catch (e) {
    console.log(e);
  }
}

// update todo to database

export async function updateTodo(
  id: number,
  title: string,
  completed: boolean
) {
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        completed,
      },
    });
    revalidatePath(TODOS);
  } catch (e) {
    console.log(e);
  }
}

// delete todo from database

export async function deleteTodo(id: number) {
  try {
    const response = await prisma.todo.delete({
      where: {
        id,
      },
    });
    revalidatePath(TODOS);
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
}
