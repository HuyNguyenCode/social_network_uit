function DeleteConfirmation({ isOpen, onClose, onConfirm, type }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; type: string }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px]">
        <h2 className="text-gray-900 text-xl font-semibold mb-4">Delete {type}?</h2>
        <p className="text-gray-700 mb-6">Once you delete this {type}, it can&apos;t be restored.</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-full">
            Go back
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-full">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteConfirmation;