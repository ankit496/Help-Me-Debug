import React, { useState } from "react";
import { useEffect } from "react";
const SortComponent = ({sortType,setSortType}) => {
  const [openSort, setOpenSort] = useState(false);
  

  const handleOutsideClick = (e) => {
    if (e.target.closest(".dropdown")) return;
    setOpenSort(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    // <div className="w-full h-screen bg-gray-900 flex justify-center items-center">
      <div className="w-full flex">
        <div className="relative dropdown">
          <button
            onClick={() => setOpenSort(!openSort)}
            className="flex text-white bg-gray-200 items-center justify-start w-40 py-2 mt-2 text-md font-semibold text-left bg-transparent rounded-lg"
          >
            <span>{sortType}</span>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className={`w-4 h-4 transition-transform duration-200 transform ${
                openSort ? "rotate-180" : "rotate-0"
              }`}
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          {openSort && (
            <div className="absolute z-50 w-full origin-top-right">
              <div className="px-2 pt-2 pb-2 bg-gray-600 rounded-xl shadow-lg dark-mode:bg-gray-700">
                <div className="flex flex-col">
                  {sortType !== "Most discussed" && (
                    <a
                      onClick={() => {
                        setSortType("Most discussed");
                        setOpenSort(false);
                      }}
                      className="flex flex-row items-start rounded-xl bg-transparent p-2 hover:bg-gray-700 cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold">Most discussed</p>
                      </div>
                    </a>
                  )}
                  {sortType !== "Most popular" && (
                    <a
                      onClick={() => {
                        setSortType("Most popular");
                        setOpenSort(false);
                      }}
                      className="flex flex-row items-start rounded-xl bg-transparent p-2 hover:bg-gray-700 cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold">Most popular</p>
                      </div>
                    </a>
                  )}
                  {sortType !== "Most upvoted" && (
                    <a
                      onClick={() => {
                        setSortType("Most upvoted");
                        setOpenSort(false);
                      }}
                      className="flex flex-row items-start rounded-xl bg-transparent p-2 hover:bg-gray-700 cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold">Most upvoted</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    // </div>
  );
};

export default SortComponent;
