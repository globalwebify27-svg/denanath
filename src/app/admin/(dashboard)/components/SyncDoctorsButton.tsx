"use client";

import { useState } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SyncDoctorsButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSync = async () => {
    if (!confirm("Are you sure you want to sync doctors from the DMH API? This will update local names and specialties.")) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/sync-doctors", { method: "POST" });
      const data = await res.json();
      
      if (res.ok) {
        alert(data.message);
        router.refresh(); // Refresh the page to show new data
      } else {
        alert("Sync failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Error syncing doctors: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSync}
      disabled={loading}
      className="flex items-center gap-2 bg-white text-[#007a87] border-2 border-[#007a87] px-7 py-3 rounded-xl hover:bg-[#007a87] hover:text-white hover:shadow-[0_8px_20px_rgba(0,122,135,0.2)] font-bold transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 size={20} strokeWidth={2.5} className="animate-spin" /> : <RefreshCw size={20} strokeWidth={2.5} />}
      {loading ? "Syncing..." : "Sync with DMH API"}
    </button>
  );
}
