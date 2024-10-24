import { useState } from "react";

const Pagination = ({totalPages,setCurrentPage,currentPage,loading}) => {

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
if(loading)
    return <></>
  return (
    <div className="grid justify-center sm:flex sm:justify-between sm:items-end gap-1">
      {/* Pagination Wrapper */}
      <nav className="flex items-center gap-x-1" aria-label="Pagination">
        <button
          type="button"
          className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-xl text-gray-600 hover:bg-gray-600 hover:text-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous"
        >
          <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <span className="sr-only">Previous</span>
        </button>

        {/* Pagination Pages */}
        <div className="flex items-center gap-x-1">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-xl focus:outline-none ${
                page === currentPage
                  ? "bg-blue-500 text-white font-semibold"
                  : "text-gray-200 hover:bg-gray-600 hover:text-gray-200"
              }`}
              onClick={() => handlePageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-xl text-gray-200 hover:bg-gray-600 hover:text-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next"
        >
          <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </nav>
      {/* End Pagination */}
    </div>
  );
};

export default Pagination;
