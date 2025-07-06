const ErrorComponent = ({ message = 'Something went wrong.', onRetry }) => {
  return (
    <div className="text-center py-20 text-red-600 space-y-4">
      <p className="text-lg font-semibold">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorComponent;
