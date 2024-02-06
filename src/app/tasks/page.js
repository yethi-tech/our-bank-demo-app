// import { useEffect, useState } from "react";

import Button from "@/components/shared/button";
import { getAllTasks, getTasks } from "@/server/tasks";
import Link from "next/link";
import { FaFileCsv } from "react-icons/fa";

export default async function Tasks() {
  let loading = true;
  try {
    const todos = await getAllTasks();
    loading = false;
    return (
      <div
        className="h-full overflow-hidden p-4 flex flex-col"
        id="tasks_list_page"
      >
        <div className="py-2 flex flex-row items-center" id="page_header">
          <div className="grow">
            <p className="text-lg font-semibold">Pending Tasks</p>
          </div>
          <div
            id="page_actions"
            className="flex flex-row items-center justify-start gap-1"
          >
            <Button
              variant="contained"
              size="small"
              id="btn_create_task"
              icon="plus"
              as={Link}
              href="/tasks/new"
            >
              Create Task
            </Button>
            <Button size="small" id="btn_create_task" icon={<FaFileCsv />}>
              Export to CSV
            </Button>
          </div>
        </div>
        <div id="content"></div>
      </div>
    );
  } catch (error) {
    <div>Something went wrong!!</div>;
  }
}
