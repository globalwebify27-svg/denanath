"use client";

import { Trash2 } from "lucide-react";
import React from "react";

interface DeleteActionButtonProps {
  formAction: (formData: FormData) => void | Promise<void>;
  confirmMessage?: string;
  className?: string;
  title?: string;
  size?: number;
  children?: React.ReactNode;
}

export default function DeleteActionButton({
  formAction,
  confirmMessage = "Are you sure you want to delete this?",
  className = "p-3 text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors shadow-sm",
  title = "Delete",
  size = 18,
  children,
}: DeleteActionButtonProps) {
  return (
    <button
      formAction={formAction}
      formNoValidate
      type="submit"
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
      className={className}
      title={title}
    >
      {children || <Trash2 size={size} />}
    </button>
  );
}
