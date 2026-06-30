import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, HeartPulse } from "lucide-react";
import { notFound } from "next/navigation";

import IconPicker from "@/components/IconPicker";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import QuillEditor from "@/components/QuillEditor";
import PhotoGalleryEditor from "@/components/PhotoGalleryEditor";
import FAQEditor from "@/components/FAQEditor";

export const dynamic = "force-dynamic";

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
    
    const cleanHtml = (html: string | null) => {
      if (!html) return '';
      return html.replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '').trim();
    };

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
    const facilitiesImagesJson = formData.get("facilitiesImages") as string;
    const consultant = cleanHtml(formData.get("consultant") as string);
    
    const headOfDepartment = formData.get("headOfDepartment") as string;
    const videoUrl = formData.get("videoUrl") as string;
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

    // Helper to inject list styling (Removed - Now handled dynamically on frontend)
    // Helper to format facilities as a grid of teal boxes (Removed - Now handled dynamically on frontend)

    if (facilitiesImagesJson) {
      try {
        const items = JSON.parse(facilitiesImagesJson);
        if (items.length > 0) {
          const cheerio = await import('cheerio');
          const $ = cheerio.load(facilities, null, false);
          const unassignedItems: any[] = [];
          
          items.forEach((img: any) => {
            let assigned = false;
            if (img.name) {
              const searchName = img.name.trim().toLowerCase();
              $('p, li').each((_, el) => {
                 const text = $(el).text().trim().toLowerCase();
                 if (text && (text === searchName || text.includes(searchName))) {
                    const imgHtml = img.url && !img.url.startsWith('Image:') 
                       ? `<div class="mt-4 facility-img-wrapper"><img src="${img.url}" alt="${img.name}" class="facility-assigned-image w-full max-w-sm mx-auto h-40 object-cover rounded-xl shadow-sm border border-teal-100" /></div>` 
                       : `<div class="mt-4 facility-img-wrapper"><div class="facility-assigned-image w-full max-w-sm mx-auto h-40 bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 font-medium">${img.url || 'Image Preview'}</div></div>`;
                    
                    if (!$(el).parent().hasClass('facility-item-wrapper')) {
                       $(el).wrap('<div class="facility-item-wrapper h-full flex flex-col"></div>');
                    }
                    $(el).parent().append(imgHtml);
                    assigned = true;
                    return false;
                 }
              });
            }
            if (!assigned) {
              unassignedItems.push(img);
            }
          });
          
          facilities = $.html();

          if (unassignedItems.length > 0) {
            const facilitiesGridHtml = `
    <div class="facilities-images-grid col-span-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      ${unassignedItems.map((img: any) => `
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-teal-100 shadow-sm">
        ${img.url && !img.url.startsWith('Image:') ? 
          `<img src="${img.url}" alt="${img.name}" class="w-full h-32 object-cover rounded-lg mb-2 shadow-sm" />` : 
          `<div class="w-full h-32 bg-slate-200 rounded-lg mb-2 flex items-center justify-center text-slate-400 font-medium">${img.url || 'Image Preview'}</div>`
        }
        <span class="block font-bold text-[#007a87] m-0 text-sm mt-3">${img.name}</span>
      </div>`).join('')}
    </div>`;
            facilities = (facilities || '') + facilitiesGridHtml;
          }
        }
      } catch (e) {
         // ignore
      }
    }
    
    const faqCount = parseInt(formData.get("faq_count") as string || "0");
    let faqHtml = "";
    if (faqCount > 0) {
      faqHtml += '<ul>\n';
      for (let i = 0; i < faqCount; i++) {
         const q = formData.get(`faq_q_${i}`) as string;
         const a = cleanHtml(formData.get(`faq_a_${i}`) as string);
         if (q && a) {
            faqHtml += `  <li><strong>${q}</strong>\n${a}</li>\n`;
         }
      }
      faqHtml += "</ul>\n";
    }
    
    // The styleConsultant feature was causing nested strings on every save.
    // Consultant styling should be done dynamically on the frontend.
    const customCount = parseInt(formData.get("custom_count") as string || "0");
    let customHtml = "";
    for (let i = 0; i < customCount; i++) {
      const title = formData.get(`custom_title_${i}`) as string;
      const rawContent = formData.get(`custom_content_${i}`) as string;
      console.log(`CUSTOM SECTION ${i}: title="${title}", raw content length=${rawContent?.length}, has iframe=${rawContent?.includes('<iframe')}, has video=${rawContent?.includes('<video')}`);
      console.log(`CUSTOM SECTION ${i} CONTENT:`, rawContent?.substring(0, 500));
      const content = cleanHtml(rawContent);
      if (title && content) {
        customHtml += `  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">${title}</h3>\n${content}\n</section>\n`;
      }
    }

    const description = `
<div class="space-y-8 text-slate-700">
  ${overview ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3>${overview}</section>` : ''}
  ${spectrum ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Spectrum and Services</h3>${spectrum}</section>` : ''}
  ${paediatric ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Paediatric Liver Clinic</h3>${paediatric}</section>` : ''}
  ${facilities ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Facilities</h3>${facilities}</section>` : ''}
  ${location ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Location of Department</h3>${location}</section>` : ''}
  ${timetable ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Timetable</h3>${timetable}</section>` : ''}
  ${workload ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Departmental Workload</h3>${workload}</section>` : ''}
  ${courses ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Courses and Training</h3>${courses}</section>` : ''}
  ${events ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Events</h3>${events}</section>` : ''}
  ${customHtml}
  ${contactUs ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Contact Us</h3>${contactUs}</section>` : ''}
  ${faqHtml ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">${department.name.toUpperCase() === 'OPHTHALMOLOGY' ? 'Specialities' : 'FAQs'}</h3>${faqHtml}</section>` : ''}
  ${galleryHtml ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Photo Gallery</h3>${galleryHtml}</section>` : ''}
  ${consultant ? `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>${consultant}</section>` : ''}
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
        videoUrl,
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

    const { revalidatePath } = require("next/cache");
    revalidatePath("/", "layout"); // Clears the entire Next.js data cache for all frontend pages

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
  
  const cheerio = require('cheerio');
  const $ = cheerio.load(desc, null, false);
  
  const extractAndRemoveSection = (titles: string[]) => {
    let content = "";
    $('section').each((_, el: any) => {
      const h3 = $(el).find('h3').first();
      const text = h3.text().trim().toLowerCase();
      if (titles.map(t => t.toLowerCase()).includes(text)) {
        const elClone = $(el).clone();
        elClone.find('h3').first().remove();
        content = elClone.html() || "";
        $(el).remove();
      }
    });
    return content.trim();
  };

  const overview = extractAndRemoveSection(["Overview", "About Us"]);
  const spectrum = extractAndRemoveSection(["Spectrum and Services"]);
  const paediatric = extractAndRemoveSection(["Paediatric Liver Clinic"]);
  let facilities = extractAndRemoveSection(["Facilities"]);
  const location = extractAndRemoveSection(["Location of Department"]);
  const timetable = extractAndRemoveSection(["Departmental Timetable"]);
  const workload = extractAndRemoveSection(["Departmental Workload"]);
  const courses = extractAndRemoveSection(["Courses and Training", "Research Projects"]);
  const events = extractAndRemoveSection(["Events"]);
  const contactUs = extractAndRemoveSection(["Contact Us", "Contact Details"]);
  const gallery = extractAndRemoveSection(["Photo Gallery"]);
  let consultant = extractAndRemoveSection(["Consultant", "Consultants"]);
  const faqSectionHTML = extractAndRemoveSection(["FAQ", "FAQs", "Frequently Asked Questions", "FAQS", "Specialities", "Speciality"]);
  
  const faqItems: { question: string, answer: string }[] = [];
  if (faqSectionHTML) {
     const cheerio = await import('cheerio');
     const $ = cheerio.load(faqSectionHTML, null, false);
     $('ul').first().children('li').each((_, li) => {
        const $li = $(li);
        let question = "Question";
        const strong = $li.find('strong, b, h4').first();
        if (strong.length > 0) {
           question = strong.text().trim();
           strong.remove();
        } else {
           const childNodes = $li.contents();
           let firstTextNode = null;
           for (let i = 0; i < childNodes.length; i++) {
              if (childNodes[i].type === 'text' && childNodes[i].data.trim().length > 0) {
                 firstTextNode = childNodes[i];
                 break;
              }
           }
           if (firstTextNode) {
              question = firstTextNode.data.trim();
              $(firstTextNode).remove();
           }
        }
        const answer = $li.html() ? $li.html()!.trim() : "";
        faqItems.push({ question, answer });
     });
  }
  
  const customSections: { title: string; content: string }[] = [];
  $('section').each((_, el: any) => {
     const h3 = $(el).find('h3').first();
     const rawTitle = h3.text().trim();
     if (rawTitle) {
       const elClone = $(el).clone();
       elClone.find('h3').first().remove();
       customSections.push({ title: rawTitle, content: elClone.html() || "" });
     }
  });
  if (consultant) {
    const cheerio = require('cheerio');
    const $ = cheerio.load(consultant, null, false);
    const consultantNames: string[] = [];
    
    // Extract names from styled circles or just raw tags
    $('p, li, h4').each((_, el) => {
       let text = $(el).text().trim();
       text = text.replace(/^(?:[A-Z]\s*)+Dr\./, 'Dr.');
       text = text.replace(/&nbsp;/g, ' ').trim();
       if (text && text.length > 2) {
          consultantNames.push(text);
       }
    });
    
    if (consultantNames.length === 0) {
       let allText = '';
       $.root().contents().each((_, el) => {
          allText += $(el).text() + ' ';
       });
       let text = allText.replace(/<[^>]+>/g, '').trim();
       text = text.replace(/^(?:[A-Z]\s*)+Dr\./, 'Dr.');
       text = text.replace(/&nbsp;/g, ' ').trim();
       if (text && text.length > 2) consultantNames.push(text);
    }
    
    // Convert them back into clean paragraphs for the WYSIWYG editor
    consultant = consultantNames.map(name => `<p>${name}</p>`).join('');
  }

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

  const facilitiesImageItems: { url: string; name: string }[] = [];
  if (facilities) {
    const cheerio = await import('cheerio');
    const $ = cheerio.load(facilities, null, false);
    
    $('div.facilities-images-grid > div.bg-slate-50').each((_, el) => {
      const imgEl = $(el).find('img').first();
      const divPlaceholderEl = $(el).find('div.bg-slate-200').first();
      const textEl = $(el).find('span').length ? $(el).find('span').first() : $(el).find('p').first();
      
      const url = imgEl.attr('src') || divPlaceholderEl.text() || "";
      const name = textEl.text() || "";
      
      facilitiesImageItems.push({ url, name });
    });
    $('div.facilities-images-grid').remove();

    $('img.facility-assigned-image, div.facility-assigned-image').each((_, el) => {
       const url = $(el).attr('src') || $(el).text() || "";
       const name = $(el).attr('alt') || "";
       facilitiesImageItems.push({ url, name });
       $(el).closest('.facility-img-wrapper').remove();
    });

    $('div.facility-item-wrapper').each((_, el) => {
       $(el).replaceWith($(el).html());
    });

    facilities = $.html();
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

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="videoUrl" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Featured Video URL</label>
                <input
                  type="url"
                  id="videoUrl"
                  name="videoUrl"
                  defaultValue={department.videoUrl || ""}
                  placeholder="https://youtube.com/... or https://vimeo.com/... or .mp4 URL"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
                />
                <p className="text-[11px] font-[600] text-gray-400 mt-1">Provide a YouTube, Vimeo, or MP4 link to show alongside the description.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-[14px] font-[800] text-[#002b5c] uppercase tracking-widest mb-4">Department Content Sections</h4>
                <p className="text-[12px] font-[600] text-gray-500 mb-6">Fill in the dedicated sections below. These will be formatted automatically on the frontend.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Overview</label>
                <QuillEditor name="overview" defaultValue={overview} />
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
                <PhotoGalleryEditor name="facilitiesImages" defaultItems={facilitiesImageItems} title="Facilities Images" />
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
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Contact Us</label>
                <QuillEditor name="contactUs" defaultValue={contactUs} />
              </div>

              <div className="space-y-2">
                <PhotoGalleryEditor name="gallery" defaultItems={galleryItems} />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Consultant</label>
                <QuillEditor name="consultant" defaultValue={consultant} />
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-6 mt-6">
                <h4 className="text-[14px] font-[800] text-[#002b5c] uppercase tracking-widest mb-4">
                  {department.name.toUpperCase() === 'OPHTHALMOLOGY' ? 'Specialities' : 'FAQs'}
                </h4>
                <p className="text-[12px] font-[600] text-gray-500 mb-6">
                  {department.name.toUpperCase() === 'OPHTHALMOLOGY' 
                    ? 'Manage Specialities (Q&A format) for this department.' 
                    : 'Manage Frequently Asked Questions for this department.'}
                </p>
                <FAQEditor defaultItems={faqItems} />
              </div>

              {customSections.length > 0 && (
                <div className="border-t border-gray-100 pt-6 mt-6">
                  <h4 className="text-[14px] font-[800] text-[#002b5c] uppercase tracking-widest mb-4">Additional Custom Sections</h4>
                  <p className="text-[12px] font-[600] text-gray-500 mb-6">These are custom sections specifically detected for this department.</p>
                  <div className="space-y-8">
                    {customSections.map((sec, i) => (
                      <div className="space-y-2" key={i}>
                        <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Section: {sec.title}</label>
                        <input type="hidden" name={`custom_title_${i}`} value={sec.title} />
                        <QuillEditor name={`custom_content_${i}`} defaultValue={sec.content} />
                      </div>
                    ))}
                  </div>
                  <input type="hidden" name="custom_count" value={customSections.length} />
                </div>
              )}
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
