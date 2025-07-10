const EmptyState = ({ message = "No data available", illustration }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-4">
      {illustration && (
        <img src={illustration} alt="empty" className="w-40 h-40 opacity-60" />
      )}
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default EmptyState;
