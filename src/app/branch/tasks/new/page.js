import AddForm from "@/app/components/tasks/form";

export default function NewTask() {
  return (
    <div
      className="h-full container px-8 mx-auto py-4 flex flex-col overflow-y-auto"
      id="new_task_page_wrapper"
    >
      <AddForm />
    </div>
  );
}
