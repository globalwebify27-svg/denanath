import { prisma } from "@/lib/prisma"; // Trigger recompile
import Link from "next/link";
import { Users, Building2, Stethoscope, Briefcase, Activity, ShieldCheck, ChevronRight, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverview() {
  const doctorsCount = await prisma.doctor.count();

  const recentDoctors = await prisma.doctor.findMany({ orderBy: { createdAt: 'desc' }, take: 2 });
  const recentSubmissions = await prisma.formSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 2 });
  const recentDepartments = await prisma.department.findMany({ orderBy: { updatedAt: 'desc' }, take: 2 });

  const activities = [
    ...recentDoctors.map((d: any) => ({
      action: "New Doctor Profile Created",
      desc: `Added ${d.name} to ${d.specialty || 'General'}`,
      date: d.createdAt,
      user: "Admin User",
      color: "bg-[#007a87]"
    })),
    ...recentSubmissions.map((s: any) => ({
      action: "New Form Submission",
      desc: `Received ${s.formType.replace(/_/g, ' ')} submission`,
      date: s.createdAt,
      user: "System",
      color: "bg-amber-500"
    })),
    ...recentDepartments.map((d: any) => ({
      action: "Department Updated",
      desc: `Modified details for ${d.name}`,
      date: d.updatedAt,
      user: "Admin User",
      color: "bg-[#d9232d]"
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 4);

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

  const stats = [
    {
      title: "Doctors",
      value: doctorsCount.toString(),
      label: "Active Profiles",
      icon: <Stethoscope className="w-6 h-6 text-white" />,
      gradient: "from-[#007a87] to-[#00a8b5]",
      link: "/admin/doctors",
      trend: "+12% this month"
    },
    {
      title: "Departments",
      value: "14",
      label: "Specialties",
      icon: <Building2 className="w-6 h-6 text-white" />,
      gradient: "from-[#d9232d] to-[#ff4b55]",
      link: "/admin/departments",
      trend: "Fully operational"
    },
    {
      title: "Patient Inquiries",
      value: "42",
      label: "New Messages",
      icon: <Users className="w-6 h-6 text-white" />,
      gradient: "from-[#002b5c] to-[#004799]",
      link: "/admin/contact",
      trend: "+5 from yesterday"
    },
    {
      title: "Job Applications",
      value: "7",
      label: "Pending Review",
      icon: <Briefcase className="w-6 h-6 text-white" />,
      gradient: "from-amber-500 to-amber-400",
      link: "/admin/careers",
      trend: "3 urgent roles"
    }
  ];

  return (
    <div className="min-h-full p-4 md:p-8 space-y-8">
      {/* Premium Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#007a87]/10 via-[#d9232d]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#002b5c]/5 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#007a87]/10 border border-[#007a87]/20 text-[#007a87] text-xs font-bold tracking-widest uppercase mb-4">
              <Activity className="w-4 h-4" />
              <span>System Status: Optimal</span>
            </div>
            <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">
              Overview
            </h1>
            <p className="text-[16px] font-[700] leading-[24px] text-[#002b5c] max-w-xl">
              Welcome back to the DMH Management Portal.
            </p>
          </div>
          
          <div className="shrink-0 flex flex-col items-center lg:items-end gap-3 bg-gray-50/90 backdrop-blur-md p-5 rounded-2xl border border-gray-200 shadow-sm relative z-20 self-center lg:self-auto">
            <span className="text-[10px] font-[800] text-gray-400 uppercase tracking-[0.2em]">Current Session</span>
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-[14px] font-[800] text-[#002b5c] tracking-tight">ADMIN SECURE</span>
              <span className="relative flex h-2.5 w-2.5 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Link href={stat.link} key={i} className="group block h-full">
            <div className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col text-white backdrop-blur-xl`}>
              
              {/* Top Row: Title & Icon */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">{stat.title}</h3>
                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-white transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {stat.icon}
                </div>
              </div>

              {/* Middle Row: Value */}
              <div className="mb-4 relative z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white tracking-tight">{stat.value}</span>
                </div>
                <div className="text-sm font-semibold text-white/70 mt-1">{stat.label}</div>
              </div>

              {/* Bottom Row: Trend & Arrow */}
              <div className="mt-auto pt-4 border-t border-white/20 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white/80">
                  <TrendingUp className="w-3.5 h-3.5 opacity-80" />
                  {stat.trend}
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#002b5c] text-white transition-colors backdrop-blur-md border border-white/30">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Faded Background Icon for Depth */}
              <div className="absolute -bottom-4 -right-4 opacity-10 text-white transform group-hover:scale-110 transition-transform duration-500 pointer-events-none z-0">
                <div className="w-32 h-32">
                  {stat.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100/80 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-[22px] font-[800] text-[#002b5c] flex items-center gap-2 mb-1 tracking-tight">
              Recent System Activity
            </h2>
            <p className="text-[13px] font-[600] text-gray-500">Tracking administrative actions across the portal.</p>
          </div>
          <Link href="/admin/activity" className="hidden sm:flex text-[12px] font-[700] text-[#007a87] hover:text-white border-2 border-[#007a87]/20 hover:border-[#007a87] hover:bg-[#007a87] px-5 py-2 rounded-xl transition-all items-center gap-2 shadow-sm">
            View Full Log
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="p-8 space-y-6">
          {activities.length > 0 ? activities.map((log, i) => (
            <div key={i} className="flex gap-6 group">
              {/* Timeline Indicator */}
              <div className="flex flex-col items-center pt-2">
                <div className={`w-3.5 h-3.5 rounded-full ${log.color} ring-[6px] ring-white shadow-sm z-10`} />
                {i !== activities.length - 1 && <div className="w-0.5 h-full bg-gradient-to-b from-gray-200 to-transparent mt-2 group-hover:from-gray-300 transition-colors" />}
              </div>
              
              {/* Activity Card */}
              <div className="flex-1 pb-4">
                <div className="bg-white hover:bg-gray-50/60 rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-0.5 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${log.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-[16px] font-[800] text-gray-800 tracking-tight leading-snug">{log.action}</p>
                      <p className="text-[14px] font-[500] text-gray-500 mt-1">{log.desc}</p>
                    </div>
                    
                    {/* Requested #003360 Timing Button */}
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
