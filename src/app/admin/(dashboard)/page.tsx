import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, Building2, Stethoscope, Briefcase } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverview() {
  const doctorsCount = await prisma.doctor.count();

  const stats = [
    {
      title: "Doctors",
      value: doctorsCount.toString(),
      label: "ACTIVE PROFILES",
      icon: <Stethoscope className="w-5 h-5 text-[#007a87]" />,
      color: "border-[#007a87]",
      link: "/admin/doctors"
    },
    {
      title: "Departments",
      value: "14",
      label: "ACTIVE DEPARTMENTS",
      icon: <Building2 className="w-5 h-5 text-[#d9232d]" />,
      color: "border-[#d9232d]",
      link: "/admin/departments"
    },
    {
      title: "Patient Inquiries",
      value: "42",
      label: "NEW MESSAGES",
      icon: <Users className="w-5 h-5 text-[#002b5c]" />,
      color: "border-[#002b5c]",
      link: "/admin/contact"
    },
    {
      title: "Job Applications",
      value: "7",
      label: "PENDING REVIEW",
      icon: <Briefcase className="w-5 h-5 text-amber-500" />,
      color: "border-amber-500",
      link: "/admin/careers"
    }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-[#002b5c] tracking-tight uppercase">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1 font-medium">Welcome back to the DMH Management Portal</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Session:</span>
          <span className="text-xs font-bold text-[#002b5c] bg-[#002b5c]/10 px-3 py-1.5 rounded-full flex items-center gap-2">
            ADMIN SECURE
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Link href={stat.link} key={i}>
            <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300 border-t-4 ${stat.color} h-full flex flex-col`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xs font-bold text-[#007a87] tracking-widest uppercase">{stat.title}</h3>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-4xl font-black text-[#002b5c] mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 tracking-wider uppercase">{stat.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-[#002b5c] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#007a87]"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
            Recent System Activity
          </h2>
          <Link href="/admin/contact" className="text-sm font-bold text-[#007a87] hover:text-[#005c66] border border-[#007a87]/30 hover:border-[#007a87] px-4 py-1.5 rounded-full transition-colors">
            View All Activity
          </Link>
        </div>
        <div className="space-y-4">
          {[
            { action: "New Doctor Profile Created", time: "2 hours ago", user: "Admin User" },
            { action: "Updated Department: Plastic Surgery", time: "5 hours ago", user: "Admin User" },
            { action: "New Job Posting Added", time: "1 day ago", user: "HR Team" }
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-bold text-gray-800">{log.action}</p>
                <p className="text-xs text-gray-500 mt-0.5">by {log.user}</p>
              </div>
              <div className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                {log.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
