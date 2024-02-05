// import { useEffect, useState } from "react";

import { getTasks } from "@/server/tasks";
import TasksTable from "./components/tasksTable";
import Button from "@/components/button";
import { FaSearch } from "react-icons/fa";

export default async function Tasks() {
  let loading = true;
  try {
    const todos = await getTasks();
    loading = false;
    return (
      <div
        className="h-full overflow-hidden p-4 flex flex-col"
        id="tasks_list_page"
      >
        <div className="py-2 flex flex-row items-center" id="page_header">
          <div className="grow">
            <p className="text-lg font-semibold">Pending Tasks</p>
            <p className="text-sm">There are {todos.length} pending tasks</p>
          </div>
          <div
            id="page_actions"
            className="flex flex-row items-center justify-start gap-1"
          >
            <Button variant="contained" size="small" id="btn_create_task">
              Create Task
            </Button>
          </div>
        </div>
        <div id="content">
          <div
            className="my-3 flex flex-row items-center justify-start gap-1"
            id="sizes "
          >
            <Button variant="contained" size="tiny" id="size">
              Create Task
            </Button>
            <Button variant="contained" size="small" id="size_1">
              Create Task
            </Button>
            <Button variant="contained" size="medium" id="size_2">
              Create Task
            </Button>
            <Button variant="contained" size="large" id="size_3">
              Create Task
            </Button>
            <Button variant="contained" size="xlarge" id="size_4">
              Create Task
            </Button>
          </div>
          <div
            className="my-3 flex flex-row items-center justify-start gap-1"
            id="sizes "
          >
            <Button variant="contained" color="primary" id="contained_color">
              Create Task
            </Button>
            <Button color="default" variant="contained" id="contained_color_1">
              Create Task
            </Button>
            <Button variant="contained" color="info" id="contained_color_2">
              Create Task
            </Button>
            <Button variant="contained" color="success" id="contained_color_3">
              Create Task
            </Button>
            <Button variant="contained" color="error" id="contained_color_4">
              Create Task
            </Button>
            <Button variant="contained" color="warning" id="contained_color_4">
              Create Task
            </Button>
          </div>
          <div
            className="my-3 flex flex-row items-center justify-start gap-1"
            id="sizes "
          >
            <Button variant="outlined" color="primary" id="outlined_color">
              Create Task
            </Button>
            <Button color="default" variant="outlined" id="outlined_color_1">
              Create Task
            </Button>
            <Button variant="outlined" color="info" id="outlined_color_2">
              Create Task
            </Button>
            <Button variant="outlined" color="success" id="outlined_color_3">
              Create Task
            </Button>
            <Button variant="outlined" color="error" id="outlined_color_4">
              Create Task
            </Button>
            <Button variant="outlined" color="warning" id="outlined_color_4">
              Create Task
            </Button>
          </div>
          <div
            className="my-3 flex flex-row items-center justify-start gap-1"
            id="sizes "
          >
            <Button color="primary" id="text_color">
              Create Task
            </Button>
            <Button color="default" variant="text" id="text_color_1">
              Create Task
            </Button>
            <Button variant="text" color="info" id="text_color_2">
              Create Task
            </Button>
            <Button variant="text" color="success" id="text_color_3">
              Create Task
            </Button>
            <Button variant="text" color="error" id="text_color_4">
              Create Task
            </Button>
            <Button variant="text" color="warning" id="text_color_4">
              Create Task
            </Button>
          </div>
          <div
            className="my-3 flex flex-row items-center justify-start gap-1"
            id="sizes "
          >
            <Button color="primary" id="icon" icon="save">
              Save
            </Button>
            <Button color="primary" icon="plus" variant="contained" id="icon_1">
              New
            </Button>
            <Button variant="outlined" icon="edit" id="icon_2">
              Edit Details
            </Button>
            <Button variant="text" color="success" icon="delete" id="icon_3">
              Create Task
            </Button>
            <Button variant="text" color="error" icon="copy" id="icon_4">
              Create Task
            </Button>
            <Button variant="text" color="warning" icon="back" id="icon_4">
              Create Task
            </Button>
            <Button variant="text" color="warning" icon="refresh" id="icon_5">
              Create Task
            </Button>
            <Button variant="text" color="warning" icon="home" id="icon_6">
              Create Task
            </Button>
            <Button icon={<FaSearch />} color="primary" id="icon_custom">
              Custom Icon
            </Button>
          </div>
          <div
            className="my-3 flex flex-row items-center justify-start gap-1"
            id="sizes "
          >
            <Button
              color="primary"
              id="loading_without_text"
              icon="save"
              loading
            >
              Save
            </Button>
            <Button
              color="primary"
              id="loading_tiny"
              size="tiny"
              icon="save"
              loading
              loadingText="Tiny Loading"
            >
              Save
            </Button>
            <Button
              color="primary"
              id="loading_small"
              size="small"
              icon="save"
              loading
              loadingText="Small Loading"
            >
              Save
            </Button>
            <Button
              color="primary"
              id="loading_large"
              icon="save"
              size="large"
              loading
              loadingText="Large Loading"
            >
              Save
            </Button>
            <Button
              color="primary"
              id="loading_xlarge"
              icon="save"
              size="xlarge"
              loading
              loadingText="xlarge loading"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    <div>Something went wrong!!</div>;
  }
}
