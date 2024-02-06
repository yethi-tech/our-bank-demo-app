import Button from "@/components/shared/button";
import PageContent from "@/components/shared/pageContent";
import PageHeader from "@/components/shared/pageHeader";
import Link from "next/link";
import { Suspense } from "react";
import { FaFileCsv } from "react-icons/fa";
import TasksList from "../components/tasks/list";
import Skeleton from "../components/tasks/list/Skeleton";

export default async function Tasks() {
  try {
    return (
      <div
        className="h-full overflow-hidden p-4 flex flex-col"
        id="tasks_list_page"
      >
        <PageHeader
          title="Tasks"
          subTitle={"Tasks that need to be done"}
          id="page_header"
          actions={[
            <Button
              variant="contained"
              size="small"
              id="btn_create_task"
              icon="plus"
              as={Link}
              href="/tasks/new"
              key="newTask"
            >
              Create Task
            </Button>,
            <Button
              size="small"
              key="exportToCsv"
              id="btn_create_task"
              icon={<FaFileCsv />}
            >
              Export to CSV
            </Button>,
          ]}
        />
        <PageContent id="content" fillHeight>
          <Suspense fallback={<Skeleton />}>
            <TasksList />
          </Suspense>
        </PageContent>
      </div>
    );
  } catch (error) {
    <div>Something went wrong!!</div>;
  }
}
