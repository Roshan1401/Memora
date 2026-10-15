"use client";

import { useEffect } from "react";
import { LogOut, X } from "lucide-react";

interface LogoutModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ onClose, onConfirm }: LogoutModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-xs"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex w-full max-w-md flex-col gap-4 sm:gap-5 border-2 border-black bg-[#e6e3d9] p-4 sm:p-6 shadow-[5px_5px_0_0_#000] sm:shadow-[8px_8px_0_0_#000]">
        <div className="flex items-start justify-between gap-2 border-b-2 border-dashed border-black/40 pb-3">
          <span className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center border-2 border-black bg-red-500 text-white shadow-[2px_2px_0_0_#000]">
            <LogOut className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center border-2 border-black bg-white text-black shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black cursor-pointer"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div>
          <h2 id="logout-modal-title" className="text-lg sm:text-xl font-black uppercase text-black tracking-tight">
            Log out of MEMORA?
          </h2>
          <p className="mt-1 text-xs sm:text-sm font-bold text-[#4d4b46]">
            You will return to the home page. Your memories will stay safely saved.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 sm:gap-3 border-t-2 border-dashed border-black/40 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="border-2 border-black bg-white px-4 sm:px-6 py-2 text-xs sm:text-sm font-black uppercase text-black shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="border-2 border-black bg-red-500 px-5 sm:px-6 py-2 text-xs sm:text-sm font-black uppercase text-white shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:bg-red-600 active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}