import { createTask } from "@/server/tasks";
import AddForm from "./AddForm";

export default function NewTask() {
  const onSubmit = async (formData) => {
    "use server";
    // e.preventDefault();

    const todo = {
      title: formData.get("taskSummary"),
      description: formData.get("description"),
      priority: formData.get("priority"),
    };

    try {
      const newTask = await createTask(todo);
      console.log(newTask);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="h-full container px-8 mx-auto py-4 flex flex-col overflow-y-auto"
      id="new_task_page_wrapper"
    >
      <AddForm />
    </div>
  );
}
