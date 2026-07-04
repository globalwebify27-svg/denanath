import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, HeartPulse, Search } from "lucide-react";

import IconPicker from "@/components/IconPicker";
import QuillEditor from "@/components/QuillEditor";
import PhotoGalleryEditor from "@/components/PhotoGalleryEditor";

export default function NewDepartmentPage() {
  async function createDepartment(formData: FormData) {
    "use server";
    
    const cleanHtml = (html: string) => html;

    const name = formData.get("name") as string;
    const overview = cleanHtml(formData.get("overview") as string);
    const spectrum = cleanHtml(formData.get("spectrum") as string);
    const paediatric = cleanHtml(formData.get("paediatric") as string);
    let facilities = cleanHtml(formData.get("facilities") as string);
    const location = cleanHtml(formData.get("location") as string);
    const timetable = cleanHtml(formData.get("timetable") as string);
    const workload = cleanHtml(formData.get("workload") as string);
    const courses = cleanHtml(formData.get("courses") as string);
    const events = cleanHtml(formData.get("events") as string);
    const contactUs = cleanHtml(formData.get("contactUs") as string);
    const galleryJson = formData.get("gallery") as string;
    const consultant = formData.get("consultant") as string;
    
    const headOfDepartment = formData.get("headOfDepartment") as string;
    const icon = formData.get("icon") as string;
    const status = formData.get("status") === "on";

    const seoMetaTitle = formData.get("seoMetaTitle") as string;
    const seoMetaDescription = formData.get("seoMetaDescription") as string;
    const seoKeywords = formData.get("seoKeywords") as string;

    let galleryHtml = "";
    if (galleryJson) {
      try {
        const items = JSON.parse(galleryJson);
        if (items.length > 0) {
          galleryHtml = `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      ${items.map((img: any) => `
      <div class="bg-slate-50 rounded-xl text-center border border-slate-200 overflow-hidden flex flex-col">
        ${img.url && !img.url.startsWith('Image:') ? 
          `<img src="${img.url}" alt="${img.name}" class="w-full h-48 object-cover m-0" />` : 
          `<div class="w-full h-48 bg-slate-200 flex items-center justify-center text-slate-400 font-medium">${img.url || 'Image Preview'}</div>`
        }
        <div class="p-4 flex-grow flex items-center justify-center">
          <p class="font-bold text-[#002b5c] m-0">${img.name}</p>
        </div>
      </div>`).join('')}
    </div>`;
        }
      } catch (e) {
        galleryHtml = galleryJson;
      }
    }

    // Helper to inject list styling
    const styleList = (html: string) => {
      if (!html) return '';
      return html.replace(/<ul/g, '<ul class="list-disc pl-5 space-y-2"');
    };

    // Helper to format facilities as a grid of teal boxes
    const styleFacilities = (html: string) => {
      if (!html) return '';
      let styled = html.replace(/<ul/g, '<ul class="grid grid-cols-2 md:grid-cols-4 gap-4 list-none pl-0 m-0"');
      styled = styled.replace(/<li[^>]*>/g, '<li class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87] shadow-sm">');
      styled = styled.replace(/<p[^>]*>/g, '<p class="font-medium text-slate-800 p-4 border border-slate-200 rounded-xl bg-slate-50 mt-4">');
      return styled;
    };

    // Helper to style table
    const styleTable = (html: string) => {
      if (!html) return '';
      let styled = html.replace(/<table/g, '<div class="overflow-x-auto"><table class="w-full text-sm text-left border-collapse border border-slate-200"');
      styled = styled.replace(/<\/table>/g, '</table></div>');
      styled = styled.replace(/<thead/g, '<thead class="text-xs text-white uppercase bg-[#002b5c]"');
      styled = styled.replace(/<th/g, '<th class="px-6 py-3 border border-slate-300"');
      styled = styled.replace(/<td/g, '<td class="px-6 py-4 border border-slate-200"');
      styled = styled.replace(/<tr/g, '<tr class="bg-white hover:bg-slate-50"');
      return styled;
    };

    const description = `
<div class="space-y-8 text-slate-700">
  ${overview ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>${styleList(overview)}</section>` : ''}
  ${spectrum ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>${styleList(spectrum)}</section>` : ''}
  ${paediatric ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Paediatric Liver Clinic</h3>${styleList(paediatric)}</section>` : ''}
  ${facilities ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>${styleFacilities(facilities)}</section>` : ''}
  ${location ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3><div class="font-medium text-slate-800">${location}</div></section>` : ''}
  ${timetable ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>${styleTable(timetable)}</section>` : ''}
  ${workload ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>${styleList(workload)}</section>` : ''}
  ${courses ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>${styleList(courses)}</section>` : ''}
  ${events ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>${styleList(events)}</section>` : ''}
  ${contactUs ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>${styleList(contactUs)}</section>` : ''}
  ${galleryHtml ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Photo Gallery</h3>${galleryHtml}</section>` : ''}
  ${consultant ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>${consultant}</section>` : ''}
</div>
    `;

    // Create department without description first
    const newDepartment = await prisma.department.create({
      data: {
        name,
        headOfDepartment,
        icon,
        status,
        seoMetaTitle,
        seoMetaDescription,
        seoKeywords,
      },
    });

    // Bypass Prisma Client stale schema limit by updating description directly via SQL
    await prisma.$executeRawUnsafe(
      'UPDATE Department SET description = ? WHERE id = ?',
      description,
      newDepartment.id
    );

    redirect("/admin/departments");
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      {/* Header Section */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <Link href="/admin/departments" className="inline-flex items-center gap-2 text-sm font-bold text-[#007a87] hover:text-[#005c66] transition-colors mb-3">
            <ArrowLeft size={16} /> Back to Departments
          </Link>
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2">
            Add New Department
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Create a new medical department or unit for the hospital.
          </p>
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
        <form action={createDepartment} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Department Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Cardiology"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="headOfDepartment" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Head of Department</label>
              <input
                type="text"
                id="headOfDepartment"
                name="headOfDepartment"
                placeholder="e.g. Dr. John Doe"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Department Icon Name</label>
              <IconPicker name="icon" placeholder="Select department icon" />
              <p className="text-[11px] font-[600] text-gray-400 mt-1">Select a Lucide React icon visual representation.</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[14px] font-[800] text-[#002b5c] uppercase tracking-widest mb-4">Department Content Sections</h4>
              <p className="text-[12px] font-[600] text-gray-500 mb-6">Fill in the dedicated sections below. These will be formatted automatically on the frontend.</p>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Overview</label>
              <QuillEditor name="overview" />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Spectrum and Services</label>
              <QuillEditor name="spectrum" />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Paediatric Liver Clinic</label>
              <QuillEditor name="paediatric" />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Facilities</label>
              <QuillEditor name="facilities" />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Location of Department</label>
              <QuillEditor name="location" />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Departmental Timetable</label>
              <QuillEditor name="timetable" />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Departmental Workload</label>
              <QuillEditor name="workload" />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Courses and Training</label>
              <QuillEditor name="courses" />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Events</label>
              <QuillEditor name="events" />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Contact Us</label>
              <QuillEditor name="contactUs" />
            </div>

            <div className="space-y-2">
              <PhotoGalleryEditor name="gallery" />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Consultant</label>
              <QuillEditor name="consultant" />
            </div>
          </div>

          {/* Card: SEO Settings */}
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
                <input type="text" name="seoMetaTitle" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
                <textarea name="seoMetaDescription" rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
                <textarea name="seoKeywords" rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <input
              type="checkbox"
              id="status"
              name="status"
              defaultChecked
              className="w-5 h-5 text-[#007a87] bg-white border-gray-300 rounded focus:ring-[#007a87]"
            />
            <label htmlFor="status" className="text-[14px] font-[700] text-gray-800 cursor-pointer">
              Active Department (Visible on website)
            </label>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-wrap justify-end gap-3">
            <Link
              href="/admin/departments"
              className="whitespace-nowrap w-full sm:w-auto text-center px-6 py-3 rounded-xl font-[700] text-[13px] text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="whitespace-nowrap w-full sm:w-auto flex items-center justify-center gap-2 bg-[#007a87] text-white px-6 py-3 rounded-xl hover:bg-[#005c66] hover:shadow-lg transition-all duration-300 font-[700] text-[13px] tracking-wide hover:shadow-[0_8px_20px_rgba(0,122,135,0.3)]"
            >
              <Save size={18} />
              Save Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
