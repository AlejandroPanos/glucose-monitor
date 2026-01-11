import { ArrowLeft, ArrowRight } from "lucide-react";

const PaginationButtons = ({ currentPage, totalPages, hasNextPage, hasPrevPage, onPageChange }) => {
  return (
    <>
      <div className="w-full flex items-center justify-center gap-4 mb-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white font-medium rounded-lg border border-blue-300 shadow-sm hover:cursor-pointer hover:shadow-md hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 disabled:hover:shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <p>Previous</p>
        </button>

        <span className="text-gray-600 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white font-medium rounded-lg border border-blue-300 shadow-sm hover:cursor-pointer hover:shadow-md hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 disabled:hover:shadow-sm"
        >
          <p>Next</p>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default PaginationButtons;
