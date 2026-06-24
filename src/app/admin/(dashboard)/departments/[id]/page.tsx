import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, HeartPulse } from "lucide-react";
import { notFound } from "next/navigation";

import IconPicker from "@/components/IconPicker";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import QuillEditor from "@/components/QuillEditor";
import PhotoGalleryEditor from "@/components/PhotoGalleryEditor";

export default async function EditDepartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  
  const department = await prisma.department.findUnique({
    where: {
      id: resolvedParams.id,
    },
  });

  if (!department) {
    notFound();
  }

  async function updateDepartment(formData: FormData) {
    "use server";
    
    const name = formData.get("name") as string;
    const spectrum = formData.get("spectrum") as string;
    const paediatric = formData.get("paediatric") as string;
    const facilities = formData.get("facilities") as string;
    const location = formData.get("location") as string;
    const timetable = formData.get("timetable") as string;
    const workload = formData.get("workload") as string;
    const courses = formData.get("courses") as string;
    const events = formData.get("events") as string;
    const galleryJson = formData.get("gallery") as string;
    const consultant = formData.get("consultant") as string;
    
    const headOfDepartment = formData.get("headOfDepartment") as string;
    const icon = formData.get("icon") as string;
    const status = formData.get("status") === "on";

    let galleryHtml = "";
    if (galleryJson) {
      try {
        const items = JSON.parse(galleryJson);
        if (items.length > 0) {
          galleryHtml = `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      ${items.map((img: any) => `
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
        ${img.url && !img.url.startsWith('Image:') ? 
          `<img src="${img.url}" alt="${img.name}" class="w-full h-32 object-cover rounded-lg mb-2 shadow-sm" />` : 
          `<div class="w-full h-32 bg-slate-200 rounded-lg mb-2 flex items-center justify-center text-slate-400 font-medium">${img.url || 'Image Preview'}</div>`
        }
        <p class="font-bold text-[#002b5c]">${img.name}</p>
      </div>`).join('')}
    </div>`;
        }
      } catch (e) {
        galleryHtml = galleryJson;
      }
    }

    // Helper to inject list styling (Removed - Now handled dynamically on frontend)
    // Helper to format facilities as a grid of teal boxes (Removed - Now handled dynamically on frontend)



    // Helper to style consultant
    const styleConsultant = (html: string) => {
      if (!html) return '';
      // Extract text content from Quill's <p> tags
      let text = html.replace(/<[^>]+>/g, '').trim();
      // If it accidentally captured the old initials, clean it
      if (/^[A-Z]{2}Dr\./.test(text)) {
        text = text.substring(2);
      }
      // Replace non-breaking spaces with regular spaces
      text = text.replace(/&nbsp;/g, ' ').trim();
      if (!text) return '';
      // Generate initials (first two words)
      const words = text.split(' ').filter(Boolean);
      let initials = 'DM';
      if (words.length >= 2) {
        initials = (words[1][0] + (words[2]?.[0] || words[1][1] || '')).toUpperCase();
      } else if (words.length === 1) {
        initials = words[0].substring(0, 2).toUpperCase();
      }
      return `
      <div class="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-sm">
        <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold shrink-0">${initials}</div>
        <div>
          <h4 class="text-lg font-bold text-[#002b5c] m-0">${text}</h4>
        </div>
      </div>`;
    };

    const description = `
<div class="space-y-8 text-slate-700">
  ${spectrum ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>${spectrum}</section>` : ''}
  ${paediatric ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Paediatric Liver Clinic</h3>${paediatric}</section>` : ''}
  ${facilities ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>${facilities}</section>` : ''}
  ${location ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3><div class="font-medium text-slate-800">${location}</div></section>` : ''}
  ${timetable ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>${timetable}</section>` : ''}
  ${workload ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>${workload}</section>` : ''}
  ${courses ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>${courses}</section>` : ''}
  ${events ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>${events}</section>` : ''}
  ${galleryHtml ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Photo Gallery</h3>${galleryHtml}</section>` : ''}
  ${consultant ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>${styleConsultant(consultant)}</section>` : ''}
</div>
    `;

    const departmentId = resolvedParams.id;
    console.log("UPDATE DEPARTMENT INVOKED FOR ID:", departmentId);
    console.log("GENERATED DESCRIPTION:", description.substring(0, 100));
    
    await prisma.department.update({
      where: { id: departmentId },
      data: {
        name,
        headOfDepartment,
        icon,
        status,
      },
    });

    // Bypass Prisma Client stale schema limit by updating description directly via SQL
    await prisma.$executeRawUnsafe(
      'UPDATE Department SET description = ? WHERE id = ?',
      description,
      departmentId
    );

    redirect("/admin/departments");
  }

  async function deleteDepartment() {
    "use server";
    await prisma.department.delete({
      where: { id: resolvedParams.id },
    });
    redirect("/admin/departments");
  }

  const desc = department.description || "";
  
  const extractSection = (title: string) => {
    // Escape string for regex
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`<h3[^>]*>${escapedTitle}<\\/h3>([\\s\\S]*?)<\\/section>`, 'i');
    const match = desc.match(regex);
    return match ? match[1].trim() : "";
  };

  const spectrum = extractSection("Spectrum and Services");
  const paediatric = extractSection("Paediatric Liver Clinic");
  const facilities = extractSection("Facilities");
  const location = extractSection("Location of Department");
  const timetable = extractSection("Departmental Timetable");
  const workload = extractSection("Departmental Workload");
  const courses = extractSection("Courses and Training");
  const events = extractSection("Events");
  const gallery = extractSection("Photo Gallery");
  const consultant = extractSection("Consultant");

  // Parse existing gallery HTML into JSON array for the editor
  const galleryItems: { url: string; name: string }[] = [];
  if (gallery) {
    const cheerio = await import('cheerio');
    const $ = cheerio.load(gallery, null, false);
    $('div.bg-slate-50').each((_, el) => {
      const imgEl = $(el).find('img').first();
      const divPlaceholderEl = $(el).find('div.bg-slate-200').first();
      const pEl = $(el).find('p').first();
      
      const url = imgEl.attr('src') || divPlaceholderEl.text() || "";
      const name = pEl.text() || "";
      
      galleryItems.push({ url, name });
    });
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={updateDepartment}>
        {/* Header Section */}
        <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
          <div className="z-10 relative">
            <Link href="/admin/departments" className="inline-flex items-center gap-2 text-sm font-bold text-[#007a87] hover:text-[#005c66] transition-colors mb-3">
              <ArrowLeft size={16} /> Back to Departments
            </Link>
            <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2">
              Edit Department
            </h1>
            <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
              Update details for {department.name}.
            </p>
          </div>
          
          {/* Actions in Header */}
          <div className="z-10 shrink-0 mt-4 lg:mt-0 flex flex-wrap items-center gap-3">
            <SubmitButton text="Save Changes" loadingText="Saving..." />
            <button
              formAction={deleteDepartment}
              formNoValidate
              type="submit"
              className="p-3 text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors shadow-sm"
              title="Delete Department"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* subtle background decoration */}
          <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
             <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10">
          {/* Card Header for Second Section */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <h3 className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Department Details</h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Department Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={department.name}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="headOfDepartment" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Head of Department</label>
                <input
                  type="text"
                  id="headOfDepartment"
                  name="headOfDepartment"
                  defaultValue={department.headOfDepartment || ""}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Department Icon Name</label>
                <IconPicker name="icon" defaultValue={department.icon || ""} placeholder="Select department icon" />
                <p className="text-[11px] font-[600] text-gray-400 mt-1">Select a Lucide React icon visual representation.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-[14px] font-[800] text-[#002b5c] uppercase tracking-widest mb-4">Department Content Sections</h4>
                <p className="text-[12px] font-[600] text-gray-500 mb-6">Fill in the dedicated sections below. These will be formatted automatically on the frontend.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Spectrum and Services</label>
                <QuillEditor name="spectrum" defaultValue={spectrum} />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Paediatric Liver Clinic</label>
                <QuillEditor name="paediatric" defaultValue={paediatric} />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Facilities</label>
                <QuillEditor name="facilities" defaultValue={facilities} />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Location of Department</label>
                <QuillEditor name="location" defaultValue={location} />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Departmental Timetable</label>
                <QuillEditor name="timetable" defaultValue={timetable} />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Departmental Workload</label>
                <QuillEditor name="workload" defaultValue={workload} />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Courses and Training</label>
                <QuillEditor name="courses" defaultValue={courses} />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Events</label>
                <QuillEditor name="events" defaultValue={events} />
              </div>

              <div className="space-y-2">
                <PhotoGalleryEditor name="gallery" defaultItems={galleryItems} />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Consultant</label>
                <QuillEditor name="consultant" defaultValue={consultant} />
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <input
                type="checkbox"
                id="status"
                name="status"
                defaultChecked={department.status}
                className="w-5 h-5 text-[#007a87] bg-white border-gray-300 rounded focus:ring-[#007a87]"
              />
              <label htmlFor="status" className="text-[14px] font-[700] text-gray-800 cursor-pointer">
                Active Department (Visible on website)
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
