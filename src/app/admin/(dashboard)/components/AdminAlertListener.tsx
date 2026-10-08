"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AdminAlertListener() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const lastAlertedRef = useRef<string | null>(null);

  useEffect(() => {
    const alertMsg = searchParams.get("alert") || searchParams.get("successMsg");
    if (alertMsg && lastAlertedRef.current !== alertMsg) {
      lastAlertedRef.current = alertMsg;
      alert(alertMsg);
      // Clean query parameter from URL without page reload
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete("alert");
        url.searchParams.delete("successMsg");
        const remainingQuery = url.searchParams.toString();
        const newUrl = url.pathname + (remainingQuery ? `?${remainingQuery}` : "");
        window.history.replaceState({}, "", newUrl);
      } catch (e) {
        // Fallback silently if URL manipulation fails
      }
    }
  }, [searchParams, pathname]);

  return null;
}
