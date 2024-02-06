"use client";

import { getTasks } from "@/app/actions/tasks";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import Error from "@/components/shared/error";
import TasksTable from "../table";
import Pagination from "@/components/shared/pagination";
import Search from "./Search";

const TasksList = () => {
  const [tasks, setTasks] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCriteria, setSearchCriteria] = useState({});

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const result = await getTasks(
          5,
          currentPage,
          { createdAt: "desc" },
          searchCriteria
        );
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
  }, [currentPage, searchCriteria]);

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

  const handleCriteriaChange = (criteria) => {
    setSearchCriteria(criteria);
  };

  return (
    <div
      className="h-full overflow-hidden flex flex-col"
      id="tasks_list_wrapper"
    >
      <div id="search_container" className="my-2">
        <Search onCriteriaChange={handleCriteriaChange} />
      </div>
      <div id="pagination_container" className="my-2 py-2">
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
