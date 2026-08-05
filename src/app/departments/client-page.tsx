"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronRight, ChevronLeft, Stethoscope, Search, ArrowRight, HeartPulse,
  Shield, Activity, Brain, Bone, Eye, Ear, Syringe,
  Microscope, Baby, Pill, Droplet, Scissors, Dna, TestTubes
} from "lucide-react";

const getDepartmentIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('cardio') || lower.includes('heart') || lower.includes('vascular')) return HeartPulse;
  if (lower.includes('neuro') || lower.includes('brain') || lower.includes('psych')) return Brain;
  if (lower.includes('ortho') || lower.includes('bone') || lower.includes('rheum') || lower.includes('joint') || lower.includes('spine')) return Bone;
  if (lower.includes('eye') || lower.includes('ophthal')) return Eye;
  if (lower.includes('ear') || lower.includes('ent') || lower.includes('audio')) return Ear;
  if (lower.includes('anaesthe') || lower.includes('anesthe') || lower.includes('vaccin') || lower.includes('pain')) return Syringe;
  if (lower.includes('patho') || lower.includes('microbio') || lower.includes('lab') || lower.includes('histopath')) return Microscope;
  if (lower.includes('baby') || lower.includes('paediat') || lower.includes('pediat') || lower.includes('neonat') || lower.includes('matern') || lower.includes('obstet') || lower.includes('gynae')) return Baby;
  if (lower.includes('pharm') || lower.includes('medic') || lower.includes('physician')) return Pill;
  if (lower.includes('blood') || lower.includes('transfu') || lower.includes('uro') || lower.includes('nephro') || lower.includes('kidney')) return Droplet;
  if (lower.includes('surg') || lower.includes('plastic') || lower.includes('cosmet')) return Scissors;
  if (lower.includes('onco') || lower.includes('cancer') || lower.includes('genetic')) return Dna;
  if (lower.includes('allergy') || lower.includes('immun') || lower.includes('prevent')) return Shield;
  if (lower.includes('test') || lower.includes('biochem')) return TestTubes;
  if (lower.includes('radio') || lower.includes('scan') || lower.includes('ray') || lower.includes('gastro') || lower.includes('abdomin') || lower.includes('hepat') || lower.includes('liver') || lower.includes('digest')) return Activity;
  return Stethoscope;
};

export default function DepartmentsClientPage({ departments }: { departments: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset to page 1 whenever search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredDepartments = departments.filter((dept) =>
    dept.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredDepartments.length / itemsPerPage));
  const currentDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {/* Search Box */}
      <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-6 mb-8">
        <label className="block text-[#002b5c] font-[800] mb-3">Search Department:</label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter department name..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-gray-700 shadow-sm"
            suppressHydrationWarning
          />
        </div>
      </div>

      {/* Department Cards */}
      <div className="space-y-4">
        {currentDepartments.length > 0 ? (
          currentDepartments.map((dept: any, index: number) => {
            const IconComponent = getDepartmentIcon(dept.name);
            return (
              <div
                key={dept.id}
                className="group bg-white border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:border-[#D9232D] hover:shadow-[0_8px_30px_rgb(217,35,45,0.08)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#007a87]/5 group-hover:bg-[#D9232D]/5 flex items-center justify-center shrink-0 border border-[#007a87]/10 group-hover:border-[#D9232D]/20 transition-colors">
                  <IconComponent className="w-7 h-7 text-[#007a87] group-hover:text-[#D9232D] transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-[900] text-[#002b5c] group-hover:text-[#D9232D] uppercase tracking-wide mb-2 leading-tight transition-colors">
                    {dept.name}
                  </h3>
                  <Link
                    href={`/departments/${dept.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="inline-flex items-center gap-1.5 text-[12px] font-[800] text-[#007a87] group-hover:text-[#D9232D] uppercase tracking-widest transition-colors"
                  >
                    VIEW DETAILS <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
            <p className="text-slate-500 font-medium">No departments found matching your search.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
          <div className="text-sm text-slate-500">
            Showing <span className="font-[800] text-[#002b5c]">{currentDepartments.length}</span> of{" "}
            <span className="font-[800] text-[#002b5c]">{filteredDepartments.length}</span> Results
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-[800] text-[#002b5c]">
              Page: {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-[#007a87] hover:border-[#007a87] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-10 h-10 bg-[#007a87] rounded-full text-white hover:bg-[#005e69] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
