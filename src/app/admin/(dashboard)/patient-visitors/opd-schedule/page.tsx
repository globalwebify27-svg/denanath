import { Save, Search, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import QuillEditor from "@/components/QuillEditor";
import ScheduleCrud from "./ScheduleCrud";

export const dynamic = "force-dynamic";

export default async function AdminOpdSchedulePage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_opd_schedule' } });
  
  let data: any = { 
    pageTitle: "Hospital OPD Schedule",
    subtitle: "Timetable",
    heroTitle: "OPD Schedule",
    heroBreadcrumb: "OPD Schedule",
    filterSpecialtyLabel: "Filter By Specialty:",
    filterDoctorLabel: "Filter By Doctor:"
  }; 
  try {
    if (setting) data = JSON.parse(setting.value);
  } catch(e) {}

  async function saveData(formData: FormData) {
    "use server";
    
    try {
      const parsed = {
        heroTitle: formData.get("heroTitle") || "OPD Schedule",
        heroBreadcrumb: formData.get("heroBreadcrumb") || "OPD Schedule",
        pageTitle: formData.get("pageTitle") || "Hospital OPD Schedule",
        subtitle: formData.get("subtitle") || "Timetable",
        content: formData.get("content") || "",
        filterSpecialtyLabel: formData.get("filterSpecialtyLabel") || data.filterSpecialtyLabel || "Filter By Specialty:",
        filterDoctorLabel: formData.get("filterDoctorLabel") || data.filterDoctorLabel || "Filter By Doctor:",
        tableDaysHeader: formData.get("tableDaysHeader") || data.tableDaysHeader || "Days",
        tableAppointmentHeader: formData.get("tableAppointmentHeader") || data.tableAppointmentHeader || "Appointment",
        tableAvailabilityLabel: formData.get("tableAvailabilityLabel") || data.tableAvailabilityLabel || "Availability",
        tableBookBtnLabel: formData.get("tableBookBtnLabel") || data.tableBookBtnLabel || "Book",
        detailedTimingsLabel: formData.get("detailedTimingsLabel") || data.detailedTimingsLabel || "Detailed Timings",
        loadingMessage: formData.get("loadingMessage") || data.loadingMessage || "Loading Schedule...",
        noDoctorsTitle: formData.get("noDoctorsTitle") || data.noDoctorsTitle || "No Doctors Found",
        noDoctorsDesc: formData.get("noDoctorsDesc") || data.noDoctorsDesc || "We couldn't find any doctors matching your current filters. Try adjusting the specialty or name.",
        clearFiltersBtnLabel: formData.get("clearFiltersBtnLabel") || data.clearFiltersBtnLabel || "Clear Filters",
        seoMetaTitle: formData.get("seoMetaTitle") || "",
        seoMetaDescription: formData.get("seoMetaDescription") || "",
        seoKeywords: formData.get("seoKeywords") || ""
      };
      
      const finalJson = JSON.stringify(parsed);
      
      await prisma.siteSetting.upsert({
        where: { key: 'page_opd_schedule' },
        update: { value: finalJson },
        create: { key: 'page_opd_schedule', value: finalJson }
      });
      
      revalidatePath("/admin/patient-visitors/opd-schedule");
      revalidatePath("/opd-schedule");
    } catch (e) {
      console.error("Failed to save OPD Schedule data", e);
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto pb-32 space-y-8">
      <form id="opd-schedule-form" action={saveData} className="space-y-8">
        
        {/* Header */}
        <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
          <div className="z-10 relative">
            <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
              OPD Schedule Settings
            </h1>
            <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
              Manage the content and SEO metadata for the OPD Schedule page.
            </p>
          </div>
          <div className="z-10 shrink-0 mt-4 lg:mt-0">
            <SubmitButton text="Save Changes" loadingText="Saving..." />
          </div>
        </div>

        {/* Content Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300 mb-8">
          <div className="bg-emerald-500/10 p-5 md:p-6 flex items-center gap-4 border-b border-slate-100">
            <FileText className="text-emerald-600 w-6 h-6" />
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">Hero Section</h2>
              <p className="text-[13px] text-slate-500 font-medium">Update the top banner text.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Hero Title</label>
              <input type="text" name="heroTitle" defaultValue={data.heroTitle || "OPD Schedule"} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="e.g. OPD Schedule" />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Breadcrumb Text</label>
              <input type="text" name="heroBreadcrumb" defaultValue={data.heroBreadcrumb || "OPD Schedule"} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="e.g. OPD Schedule" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
            <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-600">
              <FileText size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">Main Content & Filters</h2>
              <p className="text-[13px] text-slate-500 font-medium">Update the introductory text and filter labels shown on the page.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Page Title</label>
                <input type="text" name="pageTitle" defaultValue={data.pageTitle || "Hospital OPD Schedule"} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="e.g. Hospital OPD Schedule" />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Subtitle / Label</label>
                <input type="text" name="subtitle" defaultValue={data.subtitle || "Timetable"} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="e.g. Timetable" />
              </div>
            </div>
            
            <div className="pt-4">
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Page Content / Guidelines</label>
              <QuillEditor name="content" defaultValue={data.content || ""} />
            </div>
          </div>
        </div>
      </form>

      {/* OPD Timings & Doctor Details CRUD placed exactly after Main Content & Filters */}
      <ScheduleCrud />

      {/* SEO Settings */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
            <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-600">
              <Search size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">SEO Settings</h2>
              <p className="text-[13px] text-slate-500 font-medium">Manage search engine optimization meta tags.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Title</label>
              <input form="opd-schedule-form" type="text" name="seoMetaTitle" defaultValue={data.seoMetaTitle || ""} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
              <textarea form="opd-schedule-form" name="seoMetaDescription" defaultValue={data.seoMetaDescription || ""} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
              <textarea form="opd-schedule-form" name="seoKeywords" defaultValue={data.seoKeywords || ""} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
            </div>
          </div>
        </div>
    </div>
  );
}
