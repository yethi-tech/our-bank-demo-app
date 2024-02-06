"use client";

import { getTasks } from "@/app/actions/tasks";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import Error from "@/components/shared/error";
import TasksTable from "../table";
import Pagination from "@/components/shared/pagination";

const TasksList = () => {
  const [tasks, setTasks] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const result = await getTasks(5, currentPage, { title: "asc" });
        if (result.success) {
          setTasks(result.data);
        } else {
          setError(result.data);
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (error) {
    return <Error message={error} />;
  }

  const handleNext = () => {
    if (currentPage === tasks.totalPages) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  return (
    <div
      className="h-full overflow-hidden flex flex-col"
      id="tasks_list_wrapper"
    >
      <div id="pagination_container">
        <div id="pagination_container">
          <Pagination
            pageSize={5}
            totalPages={tasks.totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
            onNext={handleNext}
            onPrev={handlePrev}
            totalRecords={tasks.totalRecords}
          />
        </div>
      </div>
      <div className="grow h-0 overflow-auto" id="tasks_table_container">
        {loading ? (
          <Skeleton />
        ) : tasks.data ? (
          <TasksTable
            tasks={tasks}
            pageSize={5}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TasksList;
