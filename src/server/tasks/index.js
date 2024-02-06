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

export const getTasks = async (
  limit = 5,
  page = 1,
  sort = {
    createdAt: "desc",
  },
  filter = {}
) => {
  const skip = (page - 1) * limit;

  const where = {};

  if (filter.id && filter.id.length > 0) {
    where.id = {
      in: filter.id,
    };
  }

  if (filter.priority && filter.priority.length > 0) {
    where.priority = {
      in: filter.priority,
    };
  }

  try {
    const todos = await prisma.todo.findMany({
      take: limit,
      skip: skip,
      orderBy: sort,
      where,
    });

    const totalRecords = await prisma.todo.count();
    const totalPages = Math.ceil(totalRecords / limit);
    return { data: todos, totalRecords, totalPages };
  } catch (error) {
    throw error;
  }
};

export const getTasksProjection = async (pageSize) => {
  try {
    const totalRecords = await prisma.todo.count();
    const totalPages = Math.ceil(totalRecords / pageSize);
    return {
      totalRecords,
      totalPages,
    };
  } catch (error) {
    throw error;
  }
};
