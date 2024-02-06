import prisma from "@/lib/prisma";
import { getAllTasks, getTasksProjection, getTasks } from "@/server/tasks";

export async function GET() {
  try {
    const tasks = await getTasks(10, 1, { title: "asc" });
    return Response.json(tasks);
  } catch (error) {
    return Response.error().json({
      status: "ERROR",
      message: "An internal error occurred",
    });
  }
}
