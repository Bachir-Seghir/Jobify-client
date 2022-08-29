import React, { useState } from "react";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

function Pagination({ currentPage, setCurrentPage, pageCount }) {
  const handleClick = (e, action) => {
    e.preventDefault();
    if (action === "next" && currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    } else if (action === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <nav className="w-full lg:w-1/2 mx-auto px-4 mt-8 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        <span
          onClick={(e) => handleClick(e, "prev")}
          className="border-b-2 border-transparent pb-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
        >
          <ArrowNarrowLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </span>
      </div>
      <div className="-mt-px flex">
        {Array(pageCount)
          .fill()
          .map((_, i) => (
            <span
              onClick={() => setCurrentPage(i + 1)}
              key={i + 1}
              className={`hover:text-sky-600 hover:border-sky-600 border-b-2 pb-4 px-4 inline-flex items-center text-sm font-medium cursor-pointer ${
                currentPage === i + 1
                  ? "border-sky-600 text-sky-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              {i + 1}
            </span>
          ))}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <span
          onClick={(e) => handleClick(e, "next")}
          className="border-b-2 border-transparent pb-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
        >
          Next
          <ArrowNarrowRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </div>
    </nav>
  );
}

export default Pagination;
