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

  const currentDepartments = filteredDepartments;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentDepartments.length > 0 ? (
          currentDepartments.map((dept: any, index: number) => {
            const IconComponent = getDepartmentIcon(dept.name);
            return (
              <Link
                key={dept.id}
                href={`/departments/${dept.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="group bg-white border border-gray-200 rounded-[1.5rem] flex flex-col hover:border-[#007a87] hover:shadow-xl hover:shadow-[#007a87]/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Thumbnail / Icon Header */}
                <div className="relative h-32 w-full bg-slate-50 flex items-center justify-center border-b border-gray-100 group-hover:bg-[#007a87]/5 transition-colors">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#007a87] group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 items-center text-center">
                  <h3 className="text-[14px] font-[900] text-[#002b5c] group-hover:text-[#007a87] uppercase tracking-wide leading-tight transition-colors min-h-[40px] flex items-center justify-center">
                    {dept.name}
                  </h3>
                  <div className="mt-4 w-full rounded-xl bg-[#002b5c] px-4 py-2 text-[11px] font-bold text-white group-hover:bg-[#007a87] transition flex items-center justify-center gap-1.5 uppercase tracking-widest">
                    VIEW DETAILS <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
            <p className="text-slate-500 font-medium">No departments found matching your search.</p>
          </div>
        )}
      </div>
    </>
  );
}
