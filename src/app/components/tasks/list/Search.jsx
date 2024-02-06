"use client";

import Input from "@/components/shared/input";
import Select from "@/components/shared/select";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa";
const priorities = ["High", "Medium", "Low"];
const Search = () => {
  const [priority, setPriority] = useState(priorities[1]);

  const handlePriorityChange = (v) => {
    setPriority(v);
  };

  return (
    <div className="w-full border rounded-md shadow-sm px-4 py-2">
      <div className="search-block-title">
        <h2 className="text-sm font-semibold">Search</h2>
      </div>
      <div className="search-block-contents py-4 grid grid-cols-12 gap-x-6 gap-y-6">
        <div className="search-field col-span-2">
          <Input type="number" id="taskId" name="taskId" label="Task ID" />
        </div>
        <div className="search-field col-span-2">
          <Select
            id="priority"
            name="priority"
            label="Priority"
            options={priorities}
            value={priority}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
