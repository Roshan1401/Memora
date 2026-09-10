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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex w-full max-w-md flex-col gap-5 border-2 border-black bg-[#e6e3d9] p-6 shadow-[8px_8px_0_0_#000]">
        <div className="flex items-start justify-between gap-2">
          <span className="grid h-12 w-12 place-items-center border-2 border-black bg-red-500 text-white shadow-[2px_2px_0_0_#000]">
            <LogOut className="h-6 w-6" />
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center border-2 border-black bg-white text-black shadow-[2px_2px_0_0_#000] transition-transform hover:-translate-y-0.5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <h2 className="text-xl font-black uppercase text-black">
            Log out of MEMORA?
          </h2>
          <p className="mt-1 text-sm font-bold text-[#4d4b46]">
            You will return to the home page. Your memories will stay safely saved.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t-2 border-dashed border-black pt-4">
          <button
            onClick={onClose}
            className="border-2 border-black bg-white px-6 py-2 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="border-2 border-black bg-red-500 px-6 py-2 text-sm font-black uppercase text-white shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}