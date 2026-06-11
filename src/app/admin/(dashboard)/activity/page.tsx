import { prisma } from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ActivityLogPage() {
  const recentDoctors = await prisma.doctor.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  const recentSubmissions = await prisma.formSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  const recentDepartments = await prisma.department.findMany({ orderBy: { updatedAt: 'desc' }, take: 50 });

  const activities = [
    ...recentDoctors.map(d => ({
      action: "New Doctor Profile Created",
      desc: `Added ${d.name} to ${d.specialty || 'General'}`,
      date: d.createdAt,
      user: "Admin User",
      color: "bg-[#007a87]"
    })),
    ...recentSubmissions.map(s => ({
      action: "New Form Submission",
      desc: `Received ${s.formType.replace(/_/g, ' ')} submission`,
      date: s.createdAt,
      user: "System",
      color: "bg-amber-500"
    })),
    ...recentDepartments.map(d => ({
      action: "Department Updated",
      desc: `Modified details for ${d.name}`,
      date: d.updatedAt,
      user: "Admin User",
      color: "bg-[#d9232d]"
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 100);

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval >= 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="min-h-full p-4 md:p-8 space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#002b5c]">System Activity Log</h1>
          <p className="text-sm text-gray-500">Full history of administrative actions across the portal.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="p-8 space-y-6">
          {activities.length > 0 ? activities.map((log, i) => (
            <div key={i} className="flex gap-6 group">
              <div className="flex flex-col items-center pt-2">
                <div className={`w-3.5 h-3.5 rounded-full ${log.color} ring-[6px] ring-white shadow-sm z-10`} />
                {i !== activities.length - 1 && <div className="w-0.5 h-full bg-gradient-to-b from-gray-200 to-transparent mt-2 group-hover:from-gray-300 transition-colors" />}
              </div>
              
              <div className="flex-1 pb-4">
                <div className="bg-white hover:bg-gray-50/60 rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-0.5 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${log.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-[16px] font-[800] text-gray-800 tracking-tight leading-snug">{log.action}</p>
                      <p className="text-[14px] font-[500] text-gray-500 mt-1">{log.desc}</p>
                    </div>
                    
                    <span className="text-[10px] font-[800] text-white uppercase tracking-widest bg-[#003360] px-3 py-1.5 rounded-lg border border-[#003360] shadow-sm whitespace-nowrap shrink-0 group-hover:bg-[#002240] group-hover:border-[#002240] transition-colors">
                      {getTimeAgo(log.date)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100/80 relative z-10">
                    <div className={`w-6 h-6 rounded-full ${log.color} border-2 border-white shadow-[0_3px_8px_rgba(0,0,0,0.12)] flex items-center justify-center text-[10px] font-[900] text-white relative z-20`}>
                      {log.user.charAt(0)}
                    </div>
                    <p className="text-[12px] font-[700] text-gray-400 tracking-wide uppercase">by {log.user}</p>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center text-gray-500 py-8">No recent activity found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
