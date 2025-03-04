import React from "react";

class PokePaging extends React.Component {
  handlePageClick = (pageNumber) => {
    const { limit, setOffset } = this.props;
    setOffset((pageNumber - 1) * limit);
    window.scrollTo(0, 0);
  };

  handlePrevious = () => {
    const { offset, limit, setOffset } = this.props;
    setOffset(Math.max(0, offset - limit));
    window.scrollTo(0, 0);
  };

  handleNext = () => {
    const { offset, limit, count, setOffset } = this.props;
    setOffset(Math.min(count - limit, offset + limit));
    window.scrollTo(0, 0);
  };

  render() {
    const { count, offset, limit } = this.props;
    const totalPages = count ? Math.ceil(count / limit) : 1; // Pastikan minimal 1 halaman
    const currentPage = offset / limit + 1;

    return (
      <nav aria-label="Page navigation" className="pt-10 flex justify-center">
        <ul className="inline-flex -space-x-px text-base h-10 ">
          {/* Previous Button */}
          <li>
            <button
              onClick={this.handlePrevious}
              disabled={offset === 0}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white hover:cursor-pointer "
            >
              Previous
            </button>
          </li>

          {/* Numbered Pages */}
          {(() => {
            const maxVisiblePages = 7; // Jumlah tombol halaman yang ingin ditampilkan
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            // Pastikan ada 5 halaman yang ditampilkan jika memungkinkan
            if (endPage - startPage < maxVisiblePages - 1) {
              startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
              const pageNumber = startPage + index;
              return (
                <li key={pageNumber}>
                  <button
                    onClick={() => this.handlePageClick(pageNumber)}
                    className={`flex hover:cursor-pointer items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                      currentPage === pageNumber
                        ? "text-white bg-slate-800"
                        : "text-gray-500 bg-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            });
          })()}

          {/* Next Button */}
          <li>
            <button
              onClick={this.handleNext}
              disabled={offset + limit >= count}
              className="flex hover:cursor-pointer items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default PokePaging;
