import React from "react";
import Link from "next/link";
import { ChevronRight, Stethoscope, Building2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DoctorsDepartmentsPage() {
  const departments = await prisma.department.findMany({
    where: { status: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Hospital</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Doctors & Departments</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Doctors & Departments
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          {/* Right Main Content (Full Width since no sidebar) */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>Hospital</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Our Departments
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
                <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
                  Explore our specialized medical departments. Our team of expert doctors and state-of-the-art facilities are dedicated to providing world-class healthcare across a wide range of medical specialties.
                </p>
              </div>

              {departments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {departments.map((dept) => (
                    <div key={dept.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                      <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#007a87] mb-5 group-hover:bg-[#007a87] group-hover:text-white transition-colors">
                        <Stethoscope className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-[#002b5c] mb-3 group-hover:text-[#007a87] transition-colors">{dept.name}</h3>
                      {dept.headOfDepartment && (
                        <p className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                          Head: {dept.headOfDepartment}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-5">
                        {dept.description || "Comprehensive medical services and expert care provided by our dedicated specialists."}
                      </p>
                      <Link href="/departments" className="inline-flex items-center text-sm font-bold text-[#007a87] group-hover:gap-2 transition-all">
                        Learn More <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                    <Building2 className="w-8 h-8 text-[#007a87]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Departments Updating</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    We are currently updating our department directory. Please check back soon for a complete list of medical specialties.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
  );
}
