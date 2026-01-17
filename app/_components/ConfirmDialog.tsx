"use client";

// import { LoaderCircle } from "lucide-react";

interface ConfirmDialogProps {
  // isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  // isDeleting: boolean;
}

export default function ConfirmDialog({
  // isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: // isDeleting,
// isLoading = false,
ConfirmDialogProps) {
  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-neutral-200 mb-2">{title}</h3>
        <p className="text-neutral-400 mb-6">{message}</p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            // disabled={isLoading}
            className="px-4 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            // disabled={isDeleting}
            className="px-4 py-2  min-w-24
 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
          >
            {/* {isDeleting ? (
              <LoaderCircle size={20} className="animate-spin mx-auto" />
            ) : (
              "Confirm"
            )} */}
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
