"use client";

import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";
import { useEffect, useRef } from "react";

export default function SubmitButton({
  text = "Save Changes",
  loadingText = "Saving...",
  successMessage = "Saved successfully!"
}: {
  text?: string;
  loadingText?: string;
  successMessage?: string;
}) {
  const { pending } = useFormStatus();
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending) {
      alert(successMessage);
    }
    wasPending.current = pending;
  }, [pending, successMessage]);

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex items-center gap-2 bg-[#007a87] text-white px-7 py-3.5 rounded-xl hover:bg-[#006570] hover:shadow-[0_8px_20px_rgba(0,122,135,0.3)] font-bold transition-all duration-300 transform hover:-translate-y-0.5 ${
        pending ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {pending ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <Save size={20} strokeWidth={2.5} className="shrink-0" />
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
