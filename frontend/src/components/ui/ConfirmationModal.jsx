const ConfirmationModal = ({ action, mutation, cancel }) => {
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        onClick={cancel}
      >
        <div
          className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-4 flex flex-col gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold text-gray-800">{action}</h2>
          <p className="text-gray-500 text-sm">This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={cancel}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={mutation}
              className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
