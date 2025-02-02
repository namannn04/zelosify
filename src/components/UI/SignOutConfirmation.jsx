export default function SignOutConfirmation({
  isOpen,
  setSignOutPopUp,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Confirm Sign Out
        </h2>
        <p className="text-gray-600 mb-6">Are you sure to sign out?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setSignOutPopUp((prev) => !prev)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
