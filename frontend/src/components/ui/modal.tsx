"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, description, children, className }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className={cn(
          "w-full max-w-lg bg-obsidian-850 border border-obsidian-750/80 rounded shadow-terminal overflow-hidden flex flex-col text-terminal-text",
          className
        )}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-obsidian-700 bg-obsidian-900">
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-terminal-text flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-phosphor-cyan animate-pulse" />
              {title}
            </h2>
            {description && (
              <p className="text-[11px] text-terminal-muted mt-0.5 font-sans leading-normal">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-terminal-muted hover:text-terminal-text rounded hover:bg-obsidian-750 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto max-h-[80vh] bg-obsidian-800">{children}</div>
      </div>
    </div>
  );
}
