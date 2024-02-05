"use client";
import React from "react";
import PropTypes from "prop-types";

const TasksTable = ({ todos, loading }) => {
  return (
    <div>{loading ? "Please wait..." : `${todos.length} tasks found`}</div>
  );
};

TasksTable.propTypes = {};

export default TasksTable;
