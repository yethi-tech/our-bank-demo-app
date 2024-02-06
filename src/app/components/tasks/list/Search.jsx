"use client";

import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import Select from "@/components/shared/select";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const priorities = ["High", "Medium", "Low"];
const Search = ({ onCriteriaChange }) => {
  const [priority, setPriority] = useState(null);
  const [criteria, setCriteria] = useState({
    id: [],
    priority: [],
  });

  const handleIdChange = (e) => {
    setCriteria({ ...criteria, id: [Number(e.target.value)] });
  };
  const handlePriorityChange = (v) => {
    setCriteria({ ...criteria, priority: [v] });
  };

  const submitChange = () => {
    onCriteriaChange(criteria);
  };

  const resetFilters = () => {
    setCriteria({ id: [], priority: [] });
    onCriteriaChange({});
  };

  return (
    <div className="w-full border rounded-md shadow-sm px-4 py-2">
      <div className="search-block-title">
        <h2 className="text-sm font-semibold">Search</h2>
      </div>
      <div className="search-block-contents py-4 grid grid-cols-12 gap-x-6 gap-y-6">
        <div className="search-field col-span-2">
          <Input
            type="number"
            id="taskId"
            name="taskId"
            label="Task ID"
            value={criteria.id[0]}
            onChange={handleIdChange}
          />
        </div>
        <div className="search-field col-span-2">
          <Select
            id="priority"
            name="priority"
            label="Priority"
            options={priorities}
            by="value"
            labelKey="label"
            value={criteria.priority[0]}
            onChange={handlePriorityChange}
          />
        </div>
      </div>
      <div
        className="flex items-center justify-end flex-row gap-1"
        id="search-actions"
      >
        <Button
          onClick={submitChange}
          size="small"
          icon={<FaSearch />}
          variant="outlined"
        >
          Search
        </Button>
        <Button onClick={resetFilters} size="small" icon={"refresh"}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Search;
