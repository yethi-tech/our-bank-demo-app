"use client";

import clsx from "clsx";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Page = ({ pageNumber, active, onClick }) => {
  return (
    <a
      onClick={onClick}
      href="#"
      className={clsx(
        "relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 md:inline-flex",
        {
          "bg-tenjin-primary hover:bg-tenjin-primary-light text-slate-200":
            active,
        },
        {
          "hover:bg-gray-50": !active,
        }
      )}
    >
      {pageNumber}
    </a>
  );
};

const Pagination = ({
  pageSize,
  totalRecords,
  totalPages,
  currentPage = 1,
  onPageChange,
  onNext,
  onPrev,
}) => {
  const pageNumbersToShow = () => {
    const pages = [];
    pages.push(1); // Always include the first page

    // Determine the range of page numbers to show around the current page
    let lowerLimit = Math.max(2, currentPage - 2);
    let upperLimit = Math.min(totalPages - 1, currentPage + 2);

    // Handle case where currentPage is near the start
    if (currentPage === 1) {
      upperLimit = Math.min(3, totalPages - 1);
    }
    // Handle case where currentPage is near the end
    if (currentPage === totalPages) {
      lowerLimit = Math.max(totalPages - 4, 2);
    }

    // Add ellipsis if there's a gap between first page and lower limit
    if (lowerLimit > 2) {
      pages.push("...");
    }

    // Add the calculated range of page numbers
    for (let i = lowerLimit; i <= upperLimit; i++) {
      pages.push(i);
    }

    // Add ellipsis if there's a gap between upper limit and last page
    if (upperLimit < totalPages - 1) {
      pages.push("...");
    }

    // Always include the last page if there are at least 2 pages
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  let startRecord = totalRecords > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  let endRecord = currentPage * pageSize;

  return (
    <div className="flex items-center justify-between border-gray-200 bg-white py-3">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startRecord}</span> to{" "}
            <span className="font-medium">
              {endRecord > totalRecords ? totalRecords : endRecord}
            </span>{" "}
            of <span className="font-medium">{totalRecords}</span> records
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              onClick={onPrev}
              className="pagination__previous relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
            </a>

            {pageNumbersToShow().map((page, index) => (
              <Page
                key={index}
                onClick={() => onPageChange(page)}
                pageNumber={page}
                active={currentPage === page}
              />
            ))}
            <a
              href="#"
              onClick={onNext}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <FaChevronRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
