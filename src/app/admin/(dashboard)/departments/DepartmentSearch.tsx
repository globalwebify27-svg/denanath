"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Suggestion {
  id: string;
  name: string;
}

interface DepartmentSearchProps {
  defaultValue?: string;
}

export default function DepartmentSearch({ defaultValue = "" }: DepartmentSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (value: string) => {
    if (!value.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/departments?q=${encodeURIComponent(value)}`);
      const data: Suggestion[] = await res.json();
      setSuggestions(data);
      setShowDropdown(data.length > 0);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 280);
  };

  const handleSelect = (name: string) => {
    setQuery(name);
    setShowDropdown(false);
    router.push(`/admin/departments?q=${encodeURIComponent(name)}&page=1`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    router.push(`/admin/departments?q=${encodeURIComponent(query)}&page=1`);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    router.push(`/admin/departments?q=&page=1`);
  };

  return (
    <div ref={containerRef} className="relative w-full md:max-w-lg">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={18}
          />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            placeholder="Search departments by name..."
            className="w-full pl-11 pr-9 py-3 bg-gray-50/50 hover:bg-gray-50 border border-transparent focus:border-[#007a87]/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#007a87]/10 transition-all font-[500] text-gray-700 text-[14px]"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="shrink-0 px-4 py-3 bg-white text-gray-600 text-[13px] font-[700] rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {showDropdown && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="px-4 py-3 text-[13px] text-gray-400 font-[500]">Searching...</div>
          ) : (
            <ul>
              {suggestions.map((s, i) => {
                const initials = s.name.substring(0, 2).toUpperCase();
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(s.name)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        i !== suggestions.length - 1 ? "border-b border-gray-50" : ""
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#002b5c]/10 to-[#007a87]/10 border border-[#007a87]/20 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-[800] text-[#002b5c]">{initials}</span>
                      </div>
                      <span className="text-[13px] font-[600] text-gray-800 truncate">{s.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
