import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PokePaging = ({ limit, count, setOffset }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page")) || 1;
  const offset = (page - 1) * limit;

  useEffect(() => {
    setOffset(offset);
  }, [offset, setOffset]);

  const handlePageClick = (pageNumber) => {
    navigate(`?page=${pageNumber}`);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    if (page > 1) {
      navigate(`?page=${page - 1}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (offset + limit < count) {
      navigate(`?page=${page + 1}`);
      window.scrollTo(0, 0);
    }
  };

  const totalPages = count ? Math.ceil(count / limit) : 1;

  const maxVisiblePages = 7;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <nav aria-label="Page navigation" className="pt-10 flex justify-center">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="flex hover:cursor-pointer items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
        </li>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNumber = startPage + index;
          return (
            <li key={pageNumber}>
              <button
                onClick={() => handlePageClick(pageNumber)}
                className={`flex hover:cursor-pointer items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                  page === pageNumber ? "text-white bg-slate-800" : "text-gray-500 bg-white"
                }`}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={handleNext}
            disabled={offset + limit >= count}
            className="flex hover:cursor-pointer items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PokePaging;
