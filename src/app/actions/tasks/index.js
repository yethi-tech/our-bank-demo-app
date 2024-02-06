"use server";

import { createTask } from "@/server/tasks";
import { getTasks as searchTasks } from "@/server/tasks";

export async function createTodo(prevState, formData) {
  const todo = {
    title: formData.get("taskSummary"),
    description: formData.get("description"),
    priority: formData.get("priority"),
  };

  try {
    const newTask = await createTask(todo);
    return { success: true, message: "Created task with ID: " + newTask.id };
  } catch (error) {
    return { success: false, message: "Could not create task: " + error };
  }
}

export async function getTasks(pageSize, currentPage, sort, criteria) {
  try {
    const result = await searchTasks(pageSize, currentPage, sort, criteria);
    return { success: true, data: result };
  } catch (error) {
    throw error;
  }
}
