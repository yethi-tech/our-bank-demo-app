"use client";

import { getCustomers } from "@/app/actions/customers";
import Error from "@/components/shared/error";
import Pagination from "@/components/shared/pagination";
import React, { useEffect, useState } from "react";
import Skeleton from "../../tasks/list/Skeleton";
import CustomersTable from "../table";
import { useSearchCriteria } from "@/app/contexts/SearchCriteriaContext";

const CustomerList = () => {
  const [customers, setCustomers] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { searchCriteria } = useSearchCriteria();

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const result = await getCustomers(
          25,
          currentPage,
          { createdAt: "desc" },
          searchCriteria
        );
        if (result.success) {
          setCustomers(result.data);
        } else {
          setError(result.data);
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchCriteria]);

  if (error) {
    return <Error message={error} />;
  }

  const handleNext = () => {
    if (currentPage === customers.totalPages) {
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
      id="customers_list_wrapper"
    >
      <div id="pagination_container" className="my-2 py-2">
        <div id="pagination_container">
          <Pagination
            pageSize={5}
            totalPages={customers.totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
            onNext={handleNext}
            onPrev={handlePrev}
            totalRecords={customers.totalRecords}
          />
        </div>
      </div>
      <div className="grow h-0 overflow-auto" id="customers_table_container">
        {loading ? (
          <Skeleton />
        ) : customers.data ? (
          <CustomersTable
            customers={customers}
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

export default CustomerList;
