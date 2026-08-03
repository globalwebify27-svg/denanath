import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import DoctorProfileClient from "./DoctorProfileClient";

export const dynamic = 'force-dynamic'; // Ensure we always get fresh data

export default async function DoctorDedicatedPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Find doctor by DB id or dmhDoctorId
  const doctor = await prisma.doctor.findFirst({
    where: {
      OR: [
        { id: resolvedParams.id },
        { dmhDoctorId: resolvedParams.id }
      ]
    }
  });

  if (!doctor) {
    notFound();
  }

  // Parse JSON fields safely
  const safeParse = (val: string | null) => {
    if (!val) return [];
    try { return JSON.parse(val); } catch { return []; }
  };

  const parsedDoctor = {
    ...doctor,
    timings: safeParse(doctor.timings),
    education: safeParse(doctor.education),
    training: safeParse(doctor.training),
    experience: safeParse(doctor.experience),
    publications: safeParse(doctor.publications),
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30 pb-20">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/doctor-details" className="hover:text-white transition-colors">Doctors</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white truncate">{doctor.name}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight break-words" style={{ wordBreak: 'break-word' }}>
            Doctor Profile
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link href="/doctor-details" className="inline-flex items-center gap-2 text-[#007a87] hover:text-[#002b5c] font-bold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Doctors
        </Link>
        
        {/* Pass to Client Component for interactivity and fetching real-time schedule */}
        <DoctorProfileClient initialDoctor={parsedDoctor} />
      </div>
    </div>
  );
}
