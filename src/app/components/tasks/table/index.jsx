"use client";
import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Table from "@/components/shared/table";

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

  return (
    <div id="tasks_table_wrapper">
      <div id="table_container">
        <Table
          id="tasks_table"
          columns={columns}
          data={tasks.data}
          size="small"
        />
      </div>
      <div id="pagination_container"></div>
    </div>
  );
};

TasksTable.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default TasksTable;
