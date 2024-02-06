import prisma from "@/lib/prisma";

export const createTask = async (task) => {
  try {
    const newTask = await prisma.todo.create({ data: task });
    console.log("New task created with id: ", newTask.id);
    return newTask;
  } catch (error) {
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const todos = await prisma.todo.findMany();
    return todos;
  } catch (error) {
    throw error;
  }
};

export const getAllTasks = async (
  cursor,
  limit = 5,
  sort = [{ createdAt: "asc" }]
) => {
  try {
    const todos = await prisma.todo.findMany({
      take: limit,
      cursor: cursor ? cursor : undefined,
      skip: cursor ? 1 : 0,
      orderBy: sort,
    });
    return todos;
  } catch (error) {
    throw error;
  }
};
