import useUtilization from '../../../hooks/Dashboard/Utilization/useUtilization';

const PaginationControls = ({ totalCount }) => {
  const {
    filters: { page, pageSize },
    handleSetFilters,
  } = useUtilization();

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePrev = () => {
    if (page > 1) {
      handleSetFilters({ page: page - 1 });
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      handleSetFilters({ page: page + 1 });
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-600">
        Showing page <strong>{page}</strong> of <strong>{totalPages || 1}</strong>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-3 py-1 rounded border ${
            page === 1
              ? 'text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed'
              : 'text-gray-700 border-gray-400 hover:bg-gray-100'
          }`}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={page >= totalPages}
          className={`px-3 py-1 rounded border ${
            page >= totalPages
              ? 'text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed'
              : 'text-gray-700 border-gray-400 hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
