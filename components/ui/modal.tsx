"use client";

import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#dbeaf4]/30 p-4 backdrop-blur-sm">
      <div className={cn("glass w-full max-w-2xl rounded-[32px] p-6")}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full border border-white/30 bg-white/30 px-3 py-1 text-sm"
          >
            Tutup
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
