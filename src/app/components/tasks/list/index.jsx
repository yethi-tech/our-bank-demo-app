"use client";

import { getTasks } from "@/app/actions/tasks";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import Error from "@/components/shared/error";
import TasksTable from "../table";

const TasksList = () => {
  const [tasks, setTasks] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const result = await getTasks(20, 1, { title: "asc" });
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
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div
      className="h-full flex flex-col overflow-y-auto"
      id="tasks_list_wrapper"
    >
      <div>{tasks.data ? <TasksTable tasks={tasks} /> : <></>}</div>
    </div>
  );
};

export default TasksList;
