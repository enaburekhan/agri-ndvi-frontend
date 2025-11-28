// src/components/ConfirmModal.tsx
import React from "react";

export const ConfirmModal: React.FC<{
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3 py-2 rounded-md bg-gray-100"
          >
            {" "}
            {cancelText}{" "}
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-2 rounded-md bg-red-600 text-white"
          >
            {" "}
            {confirmText}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
