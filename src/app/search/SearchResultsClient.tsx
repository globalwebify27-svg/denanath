"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  FileText, 
  Stethoscope, 
  Building2, 
  Activity, 
  Calendar, 
  ChevronRight, 
  ExternalLink,
  UserRound,
  GraduationCap,
  Sparkles,
  ArrowRight,
  X
} from "lucide-react";
import { GlobalSearchResults } from "@/lib/searchEngine";

const SUGGESTED_SEARCHES = [
  "Charity",
  "Simulation Center",
  "Academics",
  "Awards",
  "Virtual Tour",
  "Emergency",
  "Blood Bank",
  "Pharmacy",
  "Ambulance",
  "Cardiology",
  "OPD Schedule",
  "Health Packages",
  "Careers"
];

export default function SearchResultsClient({ 
  initialResults 
}: { 
  initialResults: GlobalSearchResults 
}) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(initialResults.query);
  const [activeTab, setActiveTab] = useState<"all" | "pages" | "doctors" | "departments" | "services">("all");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleSuggestionClick = (term: string) => {
    setSearchInput(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const { query, totalResults, pages, departments, doctors, services } = initialResults;

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-24 font-sans selection:bg-teal-500/20">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#002b5c] via-[#003875] to-[#007a87] rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-xl relative overflow-hidden mb-10">
          <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-teal-200 text-xs font-semibold mb-4 border border-white/10">
              <Sparkles size={14} className="text-teal-300" />
              <span>Global Hospital Search</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
              Search Results
            </h1>
            
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8">
              {query ? (
                <>
                  Showing <span className="font-bold text-white text-lg">{totalResults}</span> results across hospital pages, doctors, departments, and services for{" "}
                  <span className="text-teal-300 font-bold underline decoration-teal-400 underline-offset-4">&quot;{query}&quot;</span>
                </>
              ) : (
                "Search across all doctors, departments, medical education, simulation, and hospital pages."
              )}
            </p>

            {/* In-Page Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm border border-white/20 p-1.5 focus-within:ring-4 focus-within:ring-teal-400/30 transition-all">
              <div className="pl-4 text-slate-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by specialty, doctor name, simulation, charity, awards..."
                className="w-full bg-transparent px-4 py-3 text-slate-800 placeholder:text-slate-400 text-sm sm:text-base font-medium outline-none"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
              <button
                type="submit"
                className="bg-[#007a87] hover:bg-[#00606a] text-white px-6 sm:px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shrink-0"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mb-8 flex items-center flex-wrap gap-2 text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] mr-1">Popular:</span>
          {SUGGESTED_SEARCHES.map((item) => (
            <button
              key={item}
              onClick={() => handleSuggestionClick(item)}
              className={`px-3 py-1.5 rounded-full border transition-all font-medium ${
                query?.toLowerCase() === item.toLowerCase()
                  ? "bg-[#002b5c] text-white border-[#002b5c] shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#007a87] hover:text-[#007a87]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Category Filter Tabs */}
        {totalResults > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-slate-200">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "all"
                  ? "bg-[#007a87] text-white shadow-md shadow-teal-700/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>All Results</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${activeTab === "all" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                {totalResults}
              </span>
            </button>

            {pages.length > 0 && (
              <button
                onClick={() => setActiveTab("pages")}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "pages"
                    ? "bg-[#007a87] text-white shadow-md shadow-teal-700/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <FileText size={16} />
                <span>Pages & Facilities</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${activeTab === "pages" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {pages.length}
                </span>
              </button>
            )}

            {doctors.length > 0 && (
              <button
                onClick={() => setActiveTab("doctors")}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "doctors"
                    ? "bg-[#007a87] text-white shadow-md shadow-teal-700/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <UserRound size={16} />
                <span>Doctors</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${activeTab === "doctors" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {doctors.length}
                </span>
              </button>
            )}

            {departments.length > 0 && (
              <button
                onClick={() => setActiveTab("departments")}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "departments"
                    ? "bg-[#007a87] text-white shadow-md shadow-teal-700/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Building2 size={16} />
                <span>Departments</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${activeTab === "departments" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {departments.length}
                </span>
              </button>
            )}

            {services.length > 0 && (
              <button
                onClick={() => setActiveTab("services")}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "services"
                    ? "bg-[#007a87] text-white shadow-md shadow-teal-700/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Activity size={16} />
                <span>Services</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${activeTab === "services" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {services.length}
                </span>
              </button>
            )}
          </div>
        )}

        {/* Results Sections */}
        {totalResults > 0 ? (
          <div className="space-y-12">
            
            {/* 1. Pages & Facilities */}
            {(activeTab === "all" || activeTab === "pages") && pages.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                  <h2 className="text-xl font-extrabold text-[#002b5c] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#007a87]" />
                    <span>Hospital Pages & Facilities ({pages.length})</span>
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                  {pages.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-[#007a87] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#007a87] bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                            {item.category}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {item.href}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors mb-2 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#007a87]">
                        <span>Visit Page</span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Specialist Doctors */}
            {(activeTab === "all" || activeTab === "doctors") && doctors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                  <h2 className="text-xl font-extrabold text-[#002b5c] flex items-center gap-2">
                    <UserRound className="w-5 h-5 text-[#007a87]" />
                    <span>Specialist Doctors ({doctors.length})</span>
                  </h2>
                  <Link href="/doctors" className="text-xs font-bold text-[#007a87] hover:underline flex items-center gap-1">
                    <span>View All Doctors</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {doctors.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-20 rounded-xl bg-teal-50 border border-teal-100 overflow-hidden shrink-0 flex items-center justify-center">
                            {doc.image ? (
                              <img
                                src={doc.image}
                                alt={doc.name}
                                className="w-full h-full object-cover"
                                onError={(e: any) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <UserRound className="w-8 h-8 text-[#007a87]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-extrabold text-[#002b5c] text-base group-hover:text-[#007a87] transition-colors truncate">
                              {doc.name}
                            </h3>
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200/60 text-amber-800 text-[10px] font-bold uppercase tracking-wider mt-1 truncate max-w-full">
                              {doc.specialty}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-4">
                          <GraduationCap className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                          <span className="line-clamp-2 leading-relaxed">{doc.qualifications}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                        <Link
                          href={doc.profileHref}
                          className="flex-1 py-2 text-center text-xs font-bold text-[#002b5c] bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                        >
                          View Profile
                        </Link>
                        <Link
                          href={doc.appointmentHref}
                          className="flex-1 py-2 text-center text-xs font-bold text-white bg-[#007a87] hover:bg-[#00606a] rounded-lg transition-colors shadow-xs"
                        >
                          Book Visit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Clinical Departments */}
            {(activeTab === "all" || activeTab === "departments") && departments.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                  <h2 className="text-xl font-extrabold text-[#002b5c] flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#007a87]" />
                    <span>Clinical Departments ({departments.length})</span>
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {departments.map((dept) => (
                    <Link
                      key={dept.id}
                      href={dept.href}
                      className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-[#007a87] shadow-xs hover:shadow-lg transition-all duration-300 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#007a87] flex items-center justify-center shrink-0 border border-teal-100">
                          <Stethoscope size={18} />
                        </div>
                        <div className="truncate">
                          <h3 className="font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors text-sm sm:text-base truncate">
                            {dept.name}
                          </h3>
                          <span className="text-xs text-slate-400">Specialty Department</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#007a87] group-hover:translate-x-1 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Clinical Services */}
            {(activeTab === "all" || activeTab === "services") && services.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                  <h2 className="text-xl font-extrabold text-[#002b5c] flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#007a87]" />
                    <span>Hospital Services ({services.length})</span>
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {services.map((svc) => (
                    <Link
                      key={svc.id}
                      href={svc.href}
                      className="group bg-white p-4 rounded-xl border border-slate-200/80 hover:border-[#007a87] shadow-xs hover:shadow-md transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-2 h-2 rounded-full bg-[#007a87] shrink-0" />
                        <span className="font-semibold text-slate-800 group-hover:text-[#007a87] transition-colors text-sm truncate">
                          {svc.title}
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-[#007a87] transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : query ? (
          /* Zero Results State */
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search size={28} />
            </div>
            <h3 className="text-2xl font-extrabold text-[#002b5c] mb-2">No matching results</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
              We couldn&apos;t find any pages, doctors, or departments matching &quot;<span className="font-semibold text-slate-700">{query}</span>&quot;. Try checking for spelling or searching for another keyword.
            </p>

            <div className="border-t border-slate-100 pt-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Popular Searches:</span>
              <div className="flex items-center justify-center flex-wrap gap-2">
                {SUGGESTED_SEARCHES.slice(0, 8).map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSuggestionClick(item)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-teal-50 hover:text-[#007a87] border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
}
