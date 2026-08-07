"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NavigationMenuToggle({ href }: { href: string }) {
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/settings?key=layout_header', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        let active = true;
        if (data && data.menus) {
          for (const m of data.menus) {
            let foundInSubmenu = false;
            if (m.dropdown) {
              for (const sub of m.dropdown) {
                if (sub.href === href) {
                  if (sub.isActive === false) active = false;
                  foundInSubmenu = true;
                }
              }
            }
            if (m.href === href && !foundInSubmenu) {
              if (m.isActive === false) active = false;
            }
          }
        }
        setIsActive(active);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [href]);

  const toggleStatus = async () => {
    const newStatus = !isActive;
    setIsActive(newStatus);

    try {
      await fetch('/api/settings/menu-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ href, isActive: newStatus })
      });
      router.refresh();
    } catch (e) {
      console.error("Failed to update menu status", e);
      setIsActive(!newStatus); // revert on failure
    }
  };

  if (loading) return <div className="mt-4 h-6 w-32 bg-slate-100 animate-pulse rounded"></div>;

  return (
    <div className="mt-4 flex items-center gap-3">
      <label className="text-sm font-semibold text-slate-700">Show in Navigation Menu:</label>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          checked={isActive} 
          onChange={toggleStatus} 
          className="sr-only peer" 
        />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
      </label>
    </div>
  );
}
