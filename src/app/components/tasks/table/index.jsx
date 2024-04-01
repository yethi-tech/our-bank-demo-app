"use client";
import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Table from "@/components/shared/table";
import Pagination from "@/components/shared/pagination";

const columns = [
  {
    name: "id",
    display: "ID",
    width: "96px",
  },
  {
    name: "title",
    display: "Task",
    width: "720px",
  },
  {
    name: "priority",
    display: "Priority",
    width: "180px",
  },
  {
    name: "createdAt",
    display: "Created",
    width: "180px",
    render: (data) => (
      <Moment format="DD MMM yyyy HH:mm">{data.createdAt}</Moment>
    ),
  },
];

const TasksTable = ({ tasks }) => {
  if (!tasks) {
    return <></>;
  }

  return <Table id="tasks_table" columns={columns} data={tasks.data} />;
};

TasksTable.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default TasksTable;
