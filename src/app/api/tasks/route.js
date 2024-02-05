import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return Response.json(todos);
  } catch (error) {
    return Response.error().json({
      status: "ERROR",
      message: "An internal error occurred",
    });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const todo = {
    title: formData.get("taskSummary"),
    description: formData.get("description"),
    priority: formData.get("priority"),
  };

  try {
    const newTodo = await prisma.todo.create({
      data: todo,
    });
    return Response.json(newTodo);
  } catch (e) {
    Response.error().json({
      status: "ERROR",
      message: "An internal error occurred",
    });
  }
}
