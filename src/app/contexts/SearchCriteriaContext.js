"use client";
import React, { createContext, useContext, useState } from "react";

const SearchCriteriaContext = createContext();

export function useSearchCriteria() {
  return useContext(SearchCriteriaContext);
}

export const SearchCriteriaProvider = ({ children }) => {
  const [searchCriteria, setSearchCriteria] = useState({});

  return (
    <SearchCriteriaContext.Provider
      value={{ searchCriteria, setSearchCriteria }}
    >
      {children}
    </SearchCriteriaContext.Provider>
  );
};
