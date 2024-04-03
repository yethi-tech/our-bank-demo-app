"use client";

import { useSearchCriteria } from "@/app/contexts/SearchCriteriaContext";
import Button from "@/components/shared/button";
import React, { useState } from "react";
import FilterDialog from "./FilterDialog";
import {
  cloneWithNonNullValues,
  hasAtLeastOneNonNullValue,
} from "@/app/utils/objectUtils";

const FilterButton = () => {
  const { searchCriteria, setSearchCriteria } = useSearchCriteria();

  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const submitCriteria = (criteria) => {
    setSearchCriteria(cloneWithNonNullValues(criteria));
    toggleDialog();
  };

  return (
    <>
      <Button
        variant={
          hasAtLeastOneNonNullValue(searchCriteria) ? "contained" : "outlined"
        }
        size="small"
        id="btn_search_filters"
        icon="filter"
        key="showFilters"
        onClick={toggleDialog}
      >
        Filters
      </Button>
      {dialogOpen && (
        <FilterDialog
          searchCriteria={searchCriteria}
          onClose={toggleDialog}
          onSubmit={submitCriteria}
        />
      )}
    </>
  );
};

export default FilterButton;
