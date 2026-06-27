import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Stethoscope, HeartPulse } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import LightboxWrapper from "@/components/LightboxWrapper";
import VideoPlayer from "@/components/VideoPlayer";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

export default async function DepartmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  
  const allDepartments = await prisma.department.findMany({
    where: { status: true }
  });

  const department = allDepartments.find(d => 
    d.id === resolvedParams.id || 
    d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === resolvedParams.id.toLowerCase()
  );

  if (!department) {
    notFound();
  }

  // Pre-process the HTML using Cheerio to fix the layout issues (like merged <br> tags)
  let processedHtml = "";
  if (department.description) {
    const $ = cheerio.load(department.description, null, false);
    
    // Add custom classes to sections
    $('section').each((_, section) => {
      const h3 = $(section).find('h3').first();
      const h3Text = h3.text().trim().toLowerCase();
      if (h3Text === 'facilities') {
        $(section).addClass('department-facilities-section');
        
        // Fix the messy HTML structure that stacks everything vertically (admin used <br> inside a single flex-col div)
        const wrappers = $(section).find('.facility-item-wrapper');
        if (wrappers.length > 0) {
          // Create a native grid to hold the columns
          const newWrapper = $('<div class="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-2"></div>');

          wrappers.each((_, wrap) => {
             const $wrap = $(wrap);
             
             // Extract texts from all p tags in this wrapper
             let pContent = "";
             $wrap.find('p').each((_, p) => {
                pContent += $(p).html() + "<br>";
             });
             
             const texts = pContent.split(/<br\s*\/?>/i)
               .map(t => t.replace(/<[^>]*>/g, '').trim()) // strip any internal tags
               .filter(t => t !== "");
               
             // Extract images from this wrapper
             const images = $wrap.find('img').toArray().map(img => ({
               src: $(img).attr('src'),
               alt: $(img).attr('alt') || ""
             }));

             texts.forEach(text => {
                // Find matching images based on alt text
                const matchedImages = images.filter(img => {
                   if (!img.alt) return false;
                   const altLower = img.alt.toLowerCase().trim();
                   const textLower = text.toLowerCase().trim();
                   return textLower.includes(altLower) || altLower.includes(textLower.substring(0, 15));
                });

                const colDiv = $('<div class="flex flex-col h-full"></div>');
                
                // The text box
                const textBox = $(`<p class="bg-teal-50 p-4 rounded-xl text-center font-semibold text-[#007a87] shadow-sm mb-4 flex-grow flex items-center justify-center">${text}</p>`);
                colDiv.append(textBox);

                // The image container below the text box
                if (matchedImages.length === 1) {
                   const imgWrap = $(`<div class="w-full h-48 sm:h-56 rounded-xl overflow-hidden shadow-sm relative bg-white shrink-0 border border-slate-100"></div>`);
                   const imgTag = $(`<img src="${matchedImages[0].src}" alt="${matchedImages[0].alt}" class="!m-0 !w-full !h-full !object-cover !rounded-none lightbox-enabled-img transition-transform hover:scale-105 duration-500 cursor-pointer">`);
                   imgWrap.append(imgTag);
                   colDiv.append(imgWrap);
                } else if (matchedImages.length > 1) {
                   // Slider
                   const sliderContainer = $('<div class="relative group w-full h-48 sm:h-56 rounded-xl overflow-hidden shadow-sm bg-white shrink-0 border border-slate-100"></div>');
                   const scrollArea = $('<div class="flex overflow-x-auto snap-x snap-mandatory h-full w-full scrollbar-hide" style="scrollbar-width: none; -ms-overflow-style: none;"></div>');
                   
                   matchedImages.forEach(mImg => {
                      const imgWrap = $('<div class="snap-center shrink-0 w-full h-full relative"></div>');
                      const imgTag = $(`<img src="${mImg.src}" alt="${mImg.alt}" class="!m-0 !w-full !h-full !object-cover !rounded-none lightbox-enabled-img transition-transform hover:scale-105 duration-500 cursor-pointer">`);
                      imgWrap.append(imgTag);
                      scrollArea.append(imgWrap);
                   });

                   // Inline JS for arrows
                   const prevBtn = $(`<button onclick="this.nextElementSibling.scrollBy({left: -this.nextElementSibling.clientWidth, behavior: 'smooth'})" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-teal-700 w-8 h-8 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 font-bold border border-teal-100">&#10094;</button>`);
                   const nextBtn = $(`<button onclick="this.previousElementSibling.scrollBy({left: this.previousElementSibling.clientWidth, behavior: 'smooth'})" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-teal-700 w-8 h-8 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 font-bold border border-teal-100">&#10095;</button>`);
                   
                   sliderContainer.append(prevBtn);
                   sliderContainer.append(scrollArea);
                   sliderContainer.append(nextBtn);
                   
                   colDiv.append(sliderContainer);
                }

                newWrapper.append(colDiv);
             });
          });

          // Replace the first wrapper with the grid, and remove all other wrappers
          wrappers.first().replaceWith(newWrapper);
          wrappers.slice(1).remove();
        } else {
          // Fallback if not using facility-item-wrapper
          $(section).find('p').each((_, p) => {
            const pHtml = $(p).html();
            if (pHtml && /<br\s*\/?>/i.test(pHtml)) {
              if ($(p).find('img').length === 0) {
                const parts = pHtml.split(/<br\s*\/?>/i).filter(part => part.trim() !== "");
                if (parts.length > 1) {
                  const newHtml = parts.map(part => `<p>${part.trim()}</p>`).join('');
                  $(p).replaceWith(newHtml);
                }
              }
            }
          });
        }

      } else if (h3Text === 'photo gallery') {
        $(section).addClass('department-gallery-section');
      } else if (h3Text === 'consultant') {
        const consultants: string[] = [];
        
        // Find all potential consultant names
        $(section).find('p, li, h4').each((_, el) => {
           let text = $(el).text().trim();
           // Clean up accidental recursive initials like "P D P D Dr."
           text = text.replace(/^(?:[A-Z]\s*)+Dr\./, 'Dr.');
           text = text.replace(/&nbsp;/g, ' ').trim();
           // Ignore single letters or empty
           if (text && text.length > 2) {
              consultants.push(text);
           }
        });
        
        // Fallback if no tags were used
        if (consultants.length === 0) {
           let allText = '';
           $(section).contents().each((_, el) => {
              if (el.tagName && el.tagName.toLowerCase() === 'h3') return;
              allText += $(el).text() + ' ';
           });
           let text = allText.replace(/<[^>]+>/g, '').trim();
           text = text.replace(/^(?:[A-Z]\s*)+Dr\./, 'Dr.');
           text = text.replace(/&nbsp;/g, ' ').trim();
           if (text && text.length > 2) consultants.push(text);
        }
        
        if (consultants.length > 0) {
           const circlesHtml = consultants.map(cleanText => {
              const words = cleanText.split(' ').filter(Boolean);
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
                    <h4 class="text-lg font-bold text-[#002b5c] m-0">${cleanText}</h4>
                  </div>
                </div>
              `;
           }).join('');
           
           const newHtml = `
             <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
               ${circlesHtml}
             </div>
           `;
           $(section).html(newHtml);
        }
      }
    });

    // Replace video embeds with actual video tags and move them to float correctly
    $('.video-embed').each((_, el) => {
      const url = $(el).attr('data-video-url');
      const type = $(el).attr('data-video-type');
      if (url) {
        let newEl;
        if (type === 'mp4') {
          newEl = $(`<video controls class="float-none md:float-left w-full md:w-[400px] h-[225px] mr-6 mb-4 rounded-xl shadow-md border border-slate-200 bg-black"><source src="${url}" type="video/mp4"></video>`);
        } else {
          newEl = $(`<iframe src="${url}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="float-none md:float-left w-full md:w-[400px] h-[225px] mr-6 mb-4 rounded-xl shadow-md border border-slate-200"></iframe>`);
        }
        
        let targetHeading = $(el).prevAll('h1, h2, h3, h4, h5, h6').first();
        if (targetHeading.length === 0) {
           const closestSection = $(el).closest('section');
           if (closestSection.length > 0) {
              targetHeading = closestSection.find('h1, h2, h3, h4, h5, h6').first();
           }
        }
        
        if (targetHeading.length > 0) {
          targetHeading.after(newEl);
          $(el).remove();
        } else {
          $(el).replaceWith(newEl);
        }
      } else {
        $(el).remove();
      }
    });

    processedHtml = $.html().replace(/&nbsp;/g, ' ');
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors whitespace-nowrap">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/departments" className="hover:text-white transition-colors whitespace-nowrap">Specialties</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-white truncate">{department.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {department.name}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Main Content */}
          <div className="w-full flex-1">
            <Link href="/departments" className="inline-flex items-center gap-2 text-[#007a87] hover:text-[#002b5c] font-bold mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Specialties
            </Link>

            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10">
              
              <div className="mb-10 flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                    <Stethoscope className="w-4 h-4" />
                    <span>Specialty Details</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                    {department.name}
                  </h2>
                  <div className="w-20 h-1.5 bg-[#007a87] rounded-full"></div>
                </div>
              </div>

              {/* Department Description / Content */}
              <div className="text-slate-700 space-y-6 break-words [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-6 [&_p:not(:last-child)]:mb-4
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-6
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_ol]:mb-6
                [&_table]:table [&_table]:w-full [&_table]:text-sm [&_table]:text-left [&_table]:border-collapse [&_table]:border [&_table]:border-slate-200
                [&_td]:px-6 [&_td]:py-4 [&_td]:border [&_td]:border-slate-200
                [&_tr:hover]:bg-slate-50
                [&_thead>tr]:!bg-[#002b5c] [&_thead>tr>th]:!text-white [&_thead>tr>th]:font-bold [&_thead>tr>th]:uppercase [&_thead>tr>th]:text-xs [&_thead>tr:first-child>th]:!border-b [&_thead>tr:first-child>th]:!border-white
                [&_thead>tr>td]:!text-white [&_thead>tr>td]:font-bold [&_thead>tr>td]:uppercase [&_thead>tr>td]:text-xs
                [&_table>tr:first-child]:!bg-[#002b5c] [&_table>tr:first-child>td]:!text-white [&_table>tr:first-child>td]:font-bold [&_table>tr:first-child>td]:uppercase [&_table>tr:first-child>td]:text-xs
                [&_tbody:first-child>tr:first-child]:!bg-[#002b5c] [&_tbody:first-child>tr:first-child>td]:!text-white [&_tbody:first-child>tr:first-child>td]:font-bold [&_tbody:first-child>tr:first-child>td]:uppercase [&_tbody:first-child>tr:first-child>td]:text-xs
                [&_.department-facilities-section]:grid [&_.department-facilities-section]:grid-cols-1 [&_.department-facilities-section]:md:grid-cols-2 [&_.department-facilities-section]:lg:grid-cols-3 [&_.department-facilities-section]:gap-4
                [&_.department-facilities-section_h3]:col-span-full
                [&_.department-facilities-section_p]:bg-teal-50 [&_.department-facilities-section_p]:p-4 [&_.department-facilities-section_p]:rounded-xl [&_.department-facilities-section_p]:text-center [&_.department-facilities-section_p]:font-semibold [&_.department-facilities-section_p]:text-[#007a87] [&_.department-facilities-section_p]:shadow-sm [&_.department-facilities-section_p]:mb-0
                
                [&_.department-facilities-section_ul]:col-span-full [&_.department-facilities-section_ul]:grid [&_.department-facilities-section_ul]:grid-cols-1 [&_.department-facilities-section_ul]:md:grid-cols-2 [&_.department-facilities-section_ul]:lg:grid-cols-3 [&_.department-facilities-section_ul]:gap-4 [&_.department-facilities-section_ul]:list-none [&_.department-facilities-section_ul]:pl-0
                [&_.department-facilities-section_li]:bg-teal-50 [&_.department-facilities-section_li]:p-4 [&_.department-facilities-section_li]:rounded-xl [&_.department-facilities-section_li]:text-center [&_.department-facilities-section_li]:font-semibold [&_.department-facilities-section_li]:text-[#007a87] [&_.department-facilities-section_li]:shadow-sm
                
                [&_iframe]:float-none [&_iframe]:md:float-left [&_iframe]:w-full [&_iframe]:md:w-[400px] [&_iframe]:h-[225px] [&_iframe]:mr-6 [&_iframe]:mb-4 [&_iframe]:rounded-xl [&_iframe]:shadow-md [&_iframe]:border [&_iframe]:border-slate-200
                
                [&_.department-gallery-section_img]:!h-48 [&_.department-gallery-section_img]:!w-full [&_.department-gallery-section_img]:!my-0 [&_.department-gallery-section_img]:!rounded-none [&_.department-gallery-section_img]:!object-cover [&_.department-gallery-section_img]:!shadow-none">
                {department.description ? (
                  <div className="clearfix">
                    {department.videoUrl && (
                      <div className="float-none md:float-left w-full md:w-[400px] lg:w-[500px] mb-6 md:mr-8 md:mb-8">
                        <VideoPlayer url={department.videoUrl} />
                      </div>
                    )}
                    <LightboxWrapper htmlContent={processedHtml} />
                  </div>
                ) : (
                  <div className="py-12 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                    <HeartPulse className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-700 mb-2">No details available</h3>
                    <p className="text-slate-500">More information about this department will be updated soon.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
