export default function SignOutConfirmation({
  isOpen,
  setSignOutPopUp,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-sm w-full mx-4 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Confirm Sign Out
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure to sign out?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setSignOutPopUp((prev) => !prev)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-gray-600 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
