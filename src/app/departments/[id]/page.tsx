import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Stethoscope, HeartPulse } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import LightboxWrapper from "@/components/LightboxWrapper";
import VideoPlayer from "@/components/VideoPlayer";
import * as cheerio from "cheerio";
import { DMH_API_CONFIG } from "@/lib/dmhApi";

export const dynamic = "force-dynamic";

export default async function DepartmentDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isProcedureView = resolvedSearchParams.view === 'procedures';
  const isPhotoGalleryView = resolvedSearchParams.view === 'photo-gallery';
  const isFaqView = resolvedSearchParams.view === 'faqs';
  
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

  const currentDeptSlug = department.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  // Pre-process the HTML using Cheerio to fix the layout issues (like merged <br> tags)
  let processedHtml = "";
  let proceduresHtml = "";
  let photoGalleryHtml = "";
  let faqHtml = "";
  
  // Pre-fetch live DMH API consultants for this department before Cheerio HTML processing
  let apiConsultantsHtml = "";
  // Move allApiDocs outside the try-catch block so we can pass it to the ClientDoctorModal
  let allApiDocs: any[] = [];

  try {
    const depName = department.name.trim().toLowerCase();
    const specRes = await fetch(`${DMH_API_CONFIG.baseUrl}${DMH_API_CONFIG.endpoints.speciality}`, {
      method: 'POST',
      headers: DMH_API_CONFIG.headers,
      body: JSON.stringify({ action: 'speciality' }),
      next: { revalidate: 3600 }
    });

    if (specRes.ok) {
      const specData = await specRes.json();
      const specList = specData?.specialityJSON || (Array.isArray(specData) ? specData : []);

      // Exact match first, then fallback to substring
      const matchedSpec = specList.find((s: any) => (s.speciality_name || '').toLowerCase() === depName) ||
                          specList.find((s: any) => {
                            const sName = (s.speciality_name || '').toLowerCase();
                            return sName.length > 5 && (depName.includes(sName) || sName.includes(depName));
                          });

      if (matchedSpec) {
        const docRes = await fetch(`${DMH_API_CONFIG.baseUrl}${DMH_API_CONFIG.endpoints.speciality_doctor}`, {
          method: 'POST',
          headers: DMH_API_CONFIG.headers,
          body: JSON.stringify({ action: 'speciality_doctor', speciality_id: String(matchedSpec.id) }),
          next: { revalidate: 3600 }
        });

        if (docRes.ok) {
          const docData = await docRes.json();
          const apiDocs = docData?.doctorJSON || (Array.isArray(docData) ? docData : []);
          allApiDocs = apiDocs;

          if (Array.isArray(apiDocs) && apiDocs.length > 0) {
            const circlesHtml = apiDocs.map((doc: any) => {
              const dName = doc.doctor_name || `${doc.first_name || ''} ${doc.last_name || ''}`.trim();
              const cleanName = dName.replace(/\s*\(.*?\)\s*/g, '').trim();
              const qual = doc.qualification || 'Consultant';
              const words = cleanName.split(' ').filter(Boolean);
              let initials = 'DM';
              if (words.length >= 2) {
                initials = (words[0][0] + words[1][0]).toUpperCase();
              } else if (words.length === 1) {
                initials = words[0].substring(0, 2).toUpperCase();
              }

              return `
                <div class="p-5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <a href="/doctor-details/${doc.doctor_id || doc.id || ''}" class="flex items-center gap-4 cursor-pointer flex-1">
                    <div class="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#007a87] font-extrabold text-base shrink-0">
                      ${doc.doctorImage ? `<img src="${doc.doctorImage}" alt="${cleanName}" class="w-full h-full object-cover rounded-2xl" />` : initials}
                    </div>
                    <div class="text-lg font-bold text-[#002b5c] m-0 leading-snug hover:text-[#007a87] transition-colors">Dr. ${cleanName}</div>
                  </a>
                  <a href="/doctor-details/${doc.doctor_id || doc.id || ''}" class="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-[#007a87] rounded-xl text-xs font-bold transition-colors shrink-0 whitespace-nowrap">
                    View Profile
                  </a>
                </div>
              `;
            }).join('');

            apiConsultantsHtml = `
              <h3 class="text-xl font-bold text-[#002b5c] mb-6 border-b pb-2">Consultants</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${circlesHtml}
              </div>
            `;
          }
        }
      }
    }
  } catch (e) {
    console.warn("Failed to pre-fetch DMH API consultants for department:", e);
  }

  if (department.description) {
    const $ = cheerio.load(department.description, null, false);
    
    // Strip inline margin and display from images to allow Tailwind to center them responsively
    $('img').each((_, img) => {
       const style = $(img).attr('style');
       if (style) {
          const newStyle = style.replace(/margin\s*:[^;]+;?/gi, '').replace(/display\s*:[^;]+;?/gi, '');
          $(img).attr('style', newStyle);
       }
    });
    
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
             
             // Extract texts from all p and li tags in this wrapper
             let pContent = "";
             $wrap.find('p, li').each((_, p) => {
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

      } else if (h3Text === 'services & clinics' || h3Text === 'clinics' || h3Text === 'services') {
        const title = $(section).find('h3').first().text();
        
        const mainUl = $(section).children('ul').first();
        if (mainUl.length > 0) {
           const gridContainer = $('<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6"></div>');
           
           mainUl.children('li').each((_, li) => {
               const $li = $(li);
               const text = $li.text().trim();
               const img = $li.find('img').first();
               
               let imgSrc = img.length > 0 ? img.attr('src') : null;
               
               const itemHtml = `
                 <div class="flex flex-col items-center text-center group">
                    ${imgSrc ? `
                      <div class="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center overflow-hidden mb-4 transition-all duration-300">
                         <img src="${imgSrc}" alt="${text}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-2xl" />
                      </div>
                    ` : `
                      <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center overflow-hidden mb-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-slate-50 transition-all duration-300">
                         <div class="text-4xl text-[#007a87] font-bold">${text.charAt(0)}</div>
                      </div>
                    `}
                    <h4 class="text-[15px] md:text-[17px] font-medium text-[#007a87] transition-colors leading-snug px-2">${text}</h4>
                 </div>
               `;
               gridContainer.append(itemHtml);
           });
           
           mainUl.replaceWith(gridContainer);
        }

      } else if (h3Text === 'faq' || h3Text === 'faqs' || h3Text === "faq's" || h3Text === 'frequently asked questions') {
        const title = $(section).find('h3').first().text();
        $(section).find('h3').first().remove();
        


        // Check if there are <h4> tags used for questions
        const h4Tags = $(section).children('h4');

        // Auto-format any raw Q&A into accordion if it uses UL/LI (only if no h4 tags are used)
        const mainUl = $(section).children('ul').first();
        if (mainUl.length > 0 && h4Tags.length === 0) {
           mainUl.addClass("list-disc pl-5 space-y-4 marker:text-black");
           mainUl.children('li').each((_, li) => {
              const $li = $(li);
              if ($li.children('details.faq-item').length > 0) return;
              
              let question = "Question";
              const strong = $li.find('strong, b, h4').first();
              
              if (strong.length > 0) {
                 question = strong.text().trim();
                 strong.remove();
              } else {
                 const childNodes = $li.contents();
                 let firstTextNode: any = null;
                 for (let i = 0; i < childNodes.length; i++) {
                    if (childNodes[i].type === 'text' && (childNodes[i] as any).data.trim().length > 0) {
                       firstTextNode = childNodes[i];
                       break;
                    }
                 }
                 if (firstTextNode) {
                    question = (firstTextNode as any).data.trim();
                    $(firstTextNode).remove();
                 }
              }
              
              const answerHtml = $li.html() ? $li.html().trim() : "";
              const newHtml = `
                <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
                  <summary class="flex items-start gap-3 list-none outline-none">
                    <h4 class="text-lg font-bold text-slate-800 !m-0 group-hover:text-black transition-colors">${question}</h4>
                  </summary>
                  <div class="text-slate-600 mt-3 border-t border-slate-100 pt-3">
                    ${answerHtml.startsWith('<p') ? answerHtml : `<p class="!mb-0 mt-3 first:mt-0">${answerHtml}</p>`}
                  </div>
                </details>
              `;
              $li.html(newHtml);
           });
        }
        
        // Auto-format any raw Q&A into accordion if it uses <h4> tags
        if (h4Tags.length > 0) {
           const accordionContainer = $('<div class="space-y-4 w-full"></div>');
           
           h4Tags.each((_, h4) => {
              const question = $(h4).text().trim();
              let answerHtml = '';
              
              let nextEl = $(h4).next();
              const elementsToRemove = [];
              
              while (nextEl.length > 0 && nextEl.prop('tagName') !== 'H4' && nextEl.prop('tagName') !== 'H3') {
                 answerHtml += $.html(nextEl);
                 elementsToRemove.push(nextEl);
                 nextEl = nextEl.next();
              }
              
              const newHtml = `
                <details class="faq-item group cursor-pointer p-5 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary class="flex items-start justify-between gap-3 list-none outline-none">
                    <h4 class="text-lg font-bold text-[#002b5c] !m-0 group-hover:text-[#007a87] transition-colors">${question}</h4>
                    <span class="text-[#007a87] group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </summary>
                  <div class="text-slate-600 mt-4 border-t border-slate-100 pt-4 prose prose-slate max-w-none">
                    ${answerHtml}
                  </div>
                </details>
              `;
              
              accordionContainer.append(newHtml);
              
              $(h4).remove();
              elementsToRemove.forEach(el => el.remove());
           });
           
           $(section).append(accordionContainer);
        }
        
        faqHtml = $(section).html() || '';
        
        $(section).addClass('mb-12 faq-section');
        $(section).prepend(`<h3 class="text-xl font-bold text-[#002b5c] mb-6 border-b pb-2">${title}</h3>`);
      } else if (h3Text === 'procedures' || h3Text === 'procedure') {
        const title = $(section).find('h3').first().text();
        $(section).find('h3').first().remove();
        
        // Check for an uploaded image to use
        let imgSrc = null;
        const imgEl = $(section).find('img').first();
        if (imgEl.length > 0) {
           imgSrc = imgEl.attr('src');
           imgEl.closest('p').length ? imgEl.closest('p').remove() : imgEl.remove();
        }

        // Apply grid UI to procedures section
        $(section).addClass('mb-12');
        
        const introText = $(section).html() || '';
        
        proceduresHtml = `
          <h3 class="text-xl font-bold text-[#002b5c] mb-6 border-b pb-2">${title}</h3>
          <div class="prose prose-slate max-w-none mb-6">${introText}</div>
        `;
        
        if (imgSrc) {
           const newSectionHtml = `
             <div class="mb-12">
               <h3 class="text-xl font-bold text-[#002b5c] mb-6 border-b pb-2">${title}</h3>
               <div class="mb-6 max-w-sm sm:max-w-md">
                 <img src="${imgSrc}" alt="${title}" class="max-h-72 w-auto object-contain !m-0" />
               </div>
               <div class="prose prose-slate max-w-none mb-4">${introText.replace(/<h3[^>]*>.*?<\/h3>/i, '')}</div>
             </div>
           `;
           $(section).replaceWith(newSectionHtml);
        } else {
           const newSectionHtml = `
             <div class="mb-12">
               <h3 class="text-xl font-bold text-[#002b5c] mb-6 border-b pb-2">${title}</h3>
               <div class="prose prose-slate max-w-none mb-4">${introText.replace(/<h3[^>]*>.*?<\/h3>/i, '')}</div>
             </div>
           `;
           $(section).replaceWith(newSectionHtml);
        }
        
      } else if (h3Text === 'specialities' || h3Text === 'speciality') {
         const title = $(section).find('h3').first().text();
         
         // Check if there are <h4> tags used for questions
         const h4Tags = $(section).children('h4, div').find('h4').addBack('h4');
         
         // Auto-format any raw Q&A into accordion if it uses UL/LI
         const mainUl = $(section).children('ul').first();
         if (mainUl.length > 0 && h4Tags.length === 0) {
            mainUl.addClass("list-disc pl-5 space-y-4 marker:text-black");
            mainUl.children('li').each((_, li) => {
               const $li = $(li);
               if ($li.children('details.faq-item').length > 0) return;
               
               let question = "Question";
               const strong = $li.find('strong, b, h4').first();
               
               if (strong.length > 0) {
                  question = strong.text().trim();
                  strong.remove();
               } else {
                  const childNodes = $li.contents();
                  let firstTextNode: any = null;
                  for (let i = 0; i < childNodes.length; i++) {
                     if (childNodes[i].type === 'text' && (childNodes[i] as any).data.trim().length > 0) {
                        firstTextNode = childNodes[i];
                        break;
                     }
                  }
                  if (firstTextNode) {
                     question = (firstTextNode as any).data.trim();
                     $(firstTextNode).remove();
                  }
               }
               
               const answerHtml = $li.html() ? $li.html().trim() : "";
               const newHtml = `
                 <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
                   <summary class="flex items-start gap-3 list-none outline-none">
                     <h4 class="text-lg font-bold text-slate-800 m-0 group-hover:text-black transition-colors">${question}</h4>
                   </summary>
                   <div class="text-slate-600 mt-3 border-t border-slate-100 pt-3">
                     ${answerHtml.startsWith('<p') ? answerHtml : `<p class="!mb-0 mt-3 first:mt-0">${answerHtml}</p>`}
                   </div>
                 </details>
               `;
               $li.html(newHtml);
            });
            
            // Rebuild the section keeping any non-accordion intro text
            const introText = $(section).html() || '';
            const newSectionHtml = `
              <div class="mb-12">
                <h3 class="text-xl font-bold text-[#002b5c] mb-6 border-b pb-2">${title}</h3>
                <div class="prose prose-slate max-w-none mb-4">${introText.replace(/<h3[^>]*>.*?<\/h3>/i, '')}</div>
              </div>
            `;
            $(section).replaceWith(newSectionHtml);
         }
         
      } else if (h3Text === 'photo gallery') {
        const title = $(section).find('h3').first().text();
        $(section).find('h3').first().remove();
        
        let shortText = "Click to view our photo gallery.";
        const firstP = $(section).find('p').first().text().trim();
        if (firstP) {
           shortText = firstP.length > 120 ? firstP.substring(0, 120) + "..." : firstP;
        }
        
        let imgSrc = null;
        // Find the first image which is not inside a grid card (to ensure we get the header image, not a gallery photo)
        const imgEl = $(section).children('img, p > img').first();
        if (imgEl.length > 0) {
           imgSrc = imgEl.attr('src');
           imgEl.closest('p').length ? imgEl.closest('p').remove() : imgEl.remove();
        } else {
           // Fallback to first image in general if no direct child image
           const fallbackImg = $(section).find('img').first();
           if (fallbackImg.length > 0) {
               imgSrc = fallbackImg.attr('src');
               // Do NOT remove the fallback image as it belongs to the gallery itself!
           }
        }

        // Apply beautiful compact grid UI to the section itself
        $(section).addClass('mb-12');
        const gridContainer = $(section).find('div.grid');
        if (gridContainer.length > 0) {
           gridContainer.addClass('grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6');
        } else {
           // Wrap children in a grid if they aren't already
           const children = $(section).children('div');
           if (children.length > 0) {
               children.wrapAll('<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-6"></div>');
           }
        }
        
        // Re-add the title
        $(section).prepend(`<h3 class="text-xl font-bold text-[#002b5c] mb-6 border-b pb-2">${title}</h3>`);
        
        // Compact formatting for the cards themselves
        $(section).find('div.bg-slate-50, div.bg-white').each((_, card) => {
           $(card).removeClass('bg-slate-50 p-4 border-slate-200')
                  .addClass('bg-white overflow-hidden shadow-sm border border-slate-100 p-0 flex flex-col h-full rounded-xl');
           
           const img = $(card).find('img');
           const textP = $(card).find('p');
           
           if (img.length === 0) {
              $(card).remove();
           } else if (img.length) {
              const hasName = textP.length > 0 && textP.text().trim().length > 0;
              
              // Compact gallery image size
              img.addClass('!m-0 !shadow-none !w-full !object-cover !h-[135px] sm:!h-[155px] md:!h-[165px]');

              if (hasName) {
                 img.addClass('!rounded-t-xl !rounded-b-none');
                 textP.addClass('!mb-0 !mt-0 text-[#002b5c] font-bold text-xs md:text-sm break-words text-center w-full');
                 
                 // Only wrap if it's not already inside a p-2/p-3 div
                 if (!textP.parent().hasClass('p-2') && !textP.parent().hasClass('p-3')) {
                     textP.wrap('<div class="p-2 md:p-3 mt-auto w-full bg-white flex items-center justify-center border-t border-slate-50 overflow-hidden"></div>');
                 } else {
                     textP.parent().removeClass('p-4').addClass('p-2 md:p-3 mt-auto bg-white border-t border-slate-50 text-center flex items-center justify-center overflow-hidden w-full');
                 }
              } else {
                 $(card).removeClass('p-0').addClass('p-1.5 md:p-2');
                 img.addClass('!rounded-lg');
                 
                 if (textP.length > 0) {
                     if (textP.parent().hasClass('p-4')) {
                         textP.parent().remove();
                     } else {
                         textP.remove();
                     }
                 }
              }
           }
        });

        
      } else if (h3Text === 'consultant' || h3Text === 'consultants') {
        if (apiConsultantsHtml) {
          $(section).html(apiConsultantsHtml);
        } else {
          // Process hardcoded consultants into cards
          const pTags = $(section).find('p, li');
          const docCards: string[] = [];
          
          pTags.each((_, p) => {
            let name = $(p).text().trim();
            if (name && (name.toLowerCase().startsWith('dr.') || name.toLowerCase().includes('dr '))) {
               name = name.replace(/^dr\.?\s*/i, 'Dr. ');
               const cleanName = name.replace(/^Dr\.\s*/, '');
               const words = cleanName.split(' ').filter(Boolean);
               let initials = 'DM';
               if (words.length >= 2) {
                 initials = (words[0][0] + words[1][0]).toUpperCase();
               } else if (words.length === 1) {
                 initials = words[0].substring(0, 2).toUpperCase();
               }

               // Try to match with API doctors to get doctor_id
               const matchedApiDoc = allApiDocs.find((apiDoc: any) => {
                 const apiName = (apiDoc.doctor_name || `${apiDoc.first_name || ''} ${apiDoc.last_name || ''}`.trim()).toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim();
                 const hardcodedName = cleanName.toLowerCase().trim();
                 return apiName === hardcodedName || apiName.includes(hardcodedName) || hardcodedName.includes(apiName);
               });
               const doctorProfileUrl = matchedApiDoc ? `/doctor-details/${matchedApiDoc.doctor_id || matchedApiDoc.id || ''}` : `/doctors`;
               const doctorImage = matchedApiDoc?.doctorImage || '';

               docCards.push(`
                <div class="p-5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <a href="${doctorProfileUrl}" class="flex items-center gap-4 cursor-pointer flex-1">
                    <div class="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#007a87] font-extrabold text-base shrink-0">
                      ${doctorImage ? `<img src="${doctorImage}" alt="${cleanName}" class="w-full h-full object-cover rounded-2xl" />` : initials}
                    </div>
                    <div class="text-lg font-bold text-[#002b5c] m-0 leading-snug hover:text-[#007a87] transition-colors">${name}</div>
                  </a>
                  <a href="${doctorProfileUrl}" class="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-[#007a87] rounded-xl text-xs font-bold transition-colors shrink-0 whitespace-nowrap">
                    View Profile
                  </a>
                </div>
               `);
               $(p).remove(); // Remove original text
            }
          });

          if (docCards.length > 0) {
            $(section).append(`
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                ${docCards.join('')}
              </div>
            `);
          }
        }
      } else if (h3Text === 'contact us') {
        $(section).addClass('department-contact-us');
      }
    });

    // Wrap tables in responsive container
    $('table').each((_, table) => {
      $(table).wrap('<div class="w-full overflow-x-auto pb-4 mb-4"></div>');
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

    // General fix for Hypoxic and Posture clinics
    if (['hypoxic-training-center', 'posture-pain-clinic'].includes(department.id)) {
      $('img').each((_, img) => {
         $(img).addClass('!max-w-full !w-auto md:!max-w-md !h-auto !rounded-2xl !my-6 !shadow-sm !object-contain !mr-auto !ml-0 !block');
         $(img).removeAttr('width');
         $(img).removeAttr('height');
         $(img).css('width', '');
         
         const parentLi = $(img).closest('li');
         if (parentLi.length > 0 && parentLi.text().trim() === '') {
            parentLi.addClass('!list-none !pl-0 !ml-0 before:!hidden marker:!hidden');
            parentLi.css('list-style', 'none');
         }
      });
    }

    // Specific fix for Paediatric Small Steps to ensure images match exactly without caching issues
    if (department.id === 'paediatric-small-steps') {
      $('img').each((_, img) => {
         // Using inline styles guarantees the exact dimensions without relying on Tailwind compiler cache.
         // Force 400x260 matching Knee clinic, with object-contain to prevent data loss.
         $(img).attr('style', 'width: 100%; max-width: 400px; height: 260px; object-fit: contain; border-radius: 1rem; margin-top: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); display: block; margin-left: 0; margin-right: auto; background-color: transparent;');
         
         // Remove all classes to prevent any database-injected classes from conflicting
         $(img).removeAttr('class');
         $(img).removeAttr('width');
         $(img).removeAttr('height');

         const parentLi = $(img).closest('li');
         if (parentLi.length > 0 && parentLi.text().trim() === '') {
            parentLi.addClass('!list-none !pl-0 !ml-0 before:!hidden marker:!hidden');
            parentLi.css('list-style', 'none');
         }
      });
    }

    // Specific fix for Knee Specialty Clinic to ensure ALL images are EXACTLY the same compact size
    if (department.id === 'knee-specialty-clinic') {
      $('img').each((_, img) => {
         const surroundingText = ($(img).parent().prev().text() + ' ' + $(img).parent().text()).trim();
         
         if (surroundingText.includes('BILD') || $(img).attr('src')?.includes('bild') || $(img).attr('src')?.includes('logo')) {
            // Exempt the BILD logo from the strict cropping so it shows full size
            $(img).addClass('!max-w-full !w-auto md:!max-w-sm !h-auto !object-contain !my-6 !mr-auto !ml-0 !block');
         } else {
            // Force a uniform width and height with object-cover so equipment photos all perfectly match
            $(img).addClass('!max-w-full !w-full sm:!w-[400px] !h-[260px] !object-cover !rounded-2xl !my-6 !shadow-sm !mr-auto !ml-0 !block');
         }
         
         $(img).removeAttr('width');
         $(img).removeAttr('height');
         $(img).css('width', '');
         
         const parentLi = $(img).closest('li');
         if (parentLi.length > 0 && parentLi.text().trim() === '') {
            parentLi.addClass('!list-none !pl-0 !ml-0 before:!hidden marker:!hidden');
            parentLi.css('list-style', 'none');
         }
      });
    }

    processedHtml = $.html().replace(/&nbsp;/g, ' ');
  }

  if (isProcedureView && proceduresHtml) {
    return (
       <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans">
          {/* Premium Page Header */}
          <div className="w-full bg-[#002b5c] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
              <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors whitespace-nowrap">Home</Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <Link href="/departments" className="hover:text-white transition-colors whitespace-nowrap">Specialties</Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <Link href={`/departments/${currentDeptSlug}`} className="hover:text-white transition-colors whitespace-nowrap">{department.name}</Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <span className="text-white truncate">Procedures</span>
              </div>
              <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
                {department.name} Procedures
              </h1>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <Link href={`/departments/${currentDeptSlug}`} className="inline-flex items-center gap-2 text-[#007a87] hover:text-[#002b5c] font-bold mb-8 transition-colors">
               <ArrowLeft className="w-4 h-4" /> Back to {department.name}
             </Link>
          
             <div className="bg-white p-8 md:p-14 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="text-slate-700 space-y-6 break-words leading-relaxed [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-6 [&_p:not(:last-child)]:mb-4
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-3 [&_ul]:mb-6
                [&_h3]:text-3xl [&_h3]:font-extrabold [&_h3]:text-[#002b5c] [&_h3]:mb-6 [&_h3]:border-b [&_h3]:pb-3
                [&_h4]:text-2xl [&_h4]:font-bold [&_h4]:text-[#007a87] [&_h4]:mt-10 [&_h4]:mb-4
                [&_strong]:text-[#002b5c]" 
                dangerouslySetInnerHTML={{ __html: proceduresHtml }} />
             </div>
          </div>
       </div>
    );
  }

  if (isPhotoGalleryView && photoGalleryHtml) {
    return (
       <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans">
          {/* Premium Page Header */}
          <div className="w-full bg-[#002b5c] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
              <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors whitespace-nowrap">Home</Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <Link href="/departments" className="hover:text-white transition-colors whitespace-nowrap">Specialties</Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <Link href={`/departments/${currentDeptSlug}`} className="hover:text-white transition-colors whitespace-nowrap">{department.name}</Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <span className="text-white truncate">Photo Gallery</span>
              </div>
              <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
                {department.name} Photo Gallery
              </h1>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <Link href={`/departments/${currentDeptSlug}`} className="inline-flex items-center gap-2 text-[#007a87] hover:text-[#002b5c] font-bold mb-8 transition-colors">
               <ArrowLeft className="w-4 h-4" /> Back to {department.name}
             </Link>
          
             <div className="bg-white p-8 md:p-14 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="text-slate-700 space-y-6 break-words leading-relaxed
                [&_.department-gallery-section]:grid [&_.department-gallery-section]:grid-cols-1 [&_.department-gallery-section]:md:grid-cols-2 [&_.department-gallery-section]:lg:grid-cols-3 [&_.department-gallery-section]:gap-8
                [&_.facilities-images-grid>div]:!p-0 [&_.facilities-images-grid>div]:!bg-white [&_.facilities-images-grid>div]:!border-slate-100 [&_.facilities-images-grid>div]:overflow-hidden [&_.facilities-images-grid>div]:flex [&_.facilities-images-grid>div]:flex-col [&_.facilities-images-grid>div]:rounded-2xl [&_.facilities-images-grid>div]:shadow-md
                [&_.facilities-images-grid_img]:!m-0 [&_.facilities-images-grid_img]:!w-full [&_.facilities-images-grid>div:has(span:not(:empty))_img]:!h-[200px] md:[&_.facilities-images-grid>div:has(span:not(:empty))_img]:!h-[240px] [&_.facilities-images-grid>div:has(span:not(:empty))_img]:!object-cover [&_.facilities-images-grid>div:has(span:empty)_img]:!h-auto [&_.facilities-images-grid>div:has(span:empty)_img]:!object-contain [&_.facilities-images-grid>div:has(span:not(:empty))_img]:!rounded-t-xl [&_.facilities-images-grid>div:has(span:not(:empty))_img]:!rounded-b-none [&_.facilities-images-grid>div:has(span:empty)_img]:!rounded-xl [&_.facilities-images-grid_img]:!shadow-none
                [&_.facilities-images-grid_span]:block [&_.facilities-images-grid_span]:p-4 [&_.facilities-images-grid_span]:!bg-white [&_.facilities-images-grid_span]:w-full [&_.facilities-images-grid_span]:empty:hidden [&_.facilities-images-grid_span]:text-[#002b5c] [&_.facilities-images-grid_span]:!mt-auto" 
                dangerouslySetInnerHTML={{ __html: photoGalleryHtml }} />
             </div>
          </div>
       </div>
    );
  }

  if (isFaqView && faqHtml) {
    return (
       <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans">
          {/* Premium Page Header */}
          <div className="w-full bg-[#002b5c] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
              <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors whitespace-nowrap">Home</Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <Link href="/departments" className="hover:text-white transition-colors whitespace-nowrap">Specialties</Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <Link href={`/departments/${currentDeptSlug}`} className="hover:text-white transition-colors whitespace-nowrap">{department.name}</Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <span className="text-white truncate">FAQ&apos;s</span>
              </div>
              <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
                {department.name} {" "}FAQ&apos;s
              </h1>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <Link href={`/departments/${currentDeptSlug}`} className="inline-flex items-center gap-2 text-[#007a87] hover:text-[#002b5c] font-bold mb-8 transition-colors">
               <ArrowLeft className="w-4 h-4" /> Back to {department.name}
             </Link>
          
             <div className="bg-white p-8 md:p-14 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="text-slate-700 space-y-6 break-words leading-relaxed prose prose-lg prose-slate max-w-none prose-headings:text-[#002b5c] prose-a:text-[#007a87]" 
                dangerouslySetInnerHTML={{ __html: faqHtml }} />
             </div>
          </div>
       </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors whitespace-nowrap">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/departments" className="hover:text-white transition-colors whitespace-nowrap">Specialties</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-white truncate">{department.name}</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight break-words" style={{ wordBreak: 'break-word' }}>
            {department.name}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8 md:pt-4 md:pb-12">
        <Link href="/departments" className="inline-flex items-center gap-2 text-[#007a87] hover:text-[#002b5c] font-bold mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Specialties
        </Link>

        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start">
          
          {/* Main Content */}
          <div className="w-full flex-1 min-w-0">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 px-6 pt-3 pb-6 sm:px-10 sm:pt-5 sm:pb-10">
              
              <div className="mb-2 flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                    <Stethoscope className="w-4 h-4" />
                    <span>Specialty Details</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] tracking-tight break-words" style={{ wordBreak: 'break-word' }}>
                    {department.name}
                  </h2>
                  <div className="w-20 h-1.5 bg-[#007a87] rounded-full mt-3 mb-3"></div>
                </div>
              </div>

              {/* Department Description / Content */}
              <div className={`text-slate-700 space-y-6 break-words [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-6 [&_img]:mx-auto [&_img]:block md:[&_img]:inline-block md:[&_img]:mx-0 ${department.name.toLowerCase().includes('rheumatology') ? 'md:[&_img]:mr-4 md:[&_img]:mb-4' : ''} [&_p:not(:last-child)]:mb-4 [&_section:not(:last-child)]:mb-10
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#002b5c] [&_h3]:mb-4 [&_h3]:border-b [&_h3]:pb-2
                [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[#007a87] [&_h4]:mt-6 [&_h4]:mb-3
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-6
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_ol]:mb-6
                [&_table]:table [&_table]:w-full [&_table]:text-sm [&_table]:text-left [&_table]:border-collapse [&_table]:border [&_table]:border-slate-200
                [&_td]:px-6 [&_td]:py-4 [&_td]:border [&_td]:border-slate-200 [&_td]:whitespace-nowrap
                [&_tr:hover]:bg-slate-50
                [&_thead>tr]:!bg-[#002b5c] [&_thead>tr>th]:!text-white [&_thead>tr>th]:font-bold [&_thead>tr>th]:uppercase [&_thead>tr>th]:text-sm [&_thead>tr:first-child>th]:!border-b [&_thead>tr:first-child>th]:!border-white [&_thead>tr>th]:whitespace-nowrap [&_thead>tr>th]:text-center
                [&_thead>tr>td]:!text-white [&_thead>tr>td]:font-bold [&_thead>tr>td]:uppercase [&_thead>tr>td]:text-sm [&_thead>tr>td]:text-center
                [&_table>tr:first-child]:!bg-[#002b5c] [&_table>tr:first-child>td]:!text-white [&_table>tr:first-child>td]:font-bold [&_table>tr:first-child>td]:uppercase [&_table>tr:first-child>td]:text-sm [&_table>tr:first-child>td]:text-center
                [&_tbody:first-child>tr:first-child]:!bg-[#002b5c] [&_tbody:first-child>tr:first-child>td]:!text-white [&_tbody:first-child>tr:first-child>td]:font-bold [&_tbody:first-child>tr:first-child>td]:uppercase [&_tbody:first-child>tr:first-child>td]:text-sm [&_tbody:first-child>tr:first-child>td]:text-center
                [&_.department-facilities-section]:grid [&_.department-facilities-section]:grid-cols-1 [&_.department-facilities-section]:md:grid-cols-2 [&_.department-facilities-section]:lg:grid-cols-3 [&_.department-facilities-section]:gap-4
                [&_.department-facilities-section_h3]:col-span-full [&_.department-facilities-section_h4]:col-span-full
                [&_.department-facilities-section_p]:bg-teal-50 [&_.department-facilities-section_p]:p-4 [&_.department-facilities-section_p]:rounded-xl [&_.department-facilities-section_p]:text-center [&_.department-facilities-section_p]:font-semibold [&_.department-facilities-section_p]:text-[#007a87] [&_.department-facilities-section_p]:shadow-sm [&_.department-facilities-section_p]:mb-0
                
                [&_.department-facilities-section_ul]:col-span-full [&_.department-facilities-section_ul]:grid [&_.department-facilities-section_ul]:grid-cols-1 [&_.department-facilities-section_ul]:md:grid-cols-2 [&_.department-facilities-section_ul]:lg:grid-cols-3 [&_.department-facilities-section_ul]:gap-4 [&_.department-facilities-section_ul]:list-none [&_.department-facilities-section_ul]:pl-0
                [&_.department-facilities-section_li]:bg-teal-50 [&_.department-facilities-section_li]:p-4 [&_.department-facilities-section_li]:rounded-xl [&_.department-facilities-section_li]:text-center [&_.department-facilities-section_li]:font-semibold [&_.department-facilities-section_li]:text-[#007a87] [&_.department-facilities-section_li]:shadow-sm
                
                [&_.facilities-images-grid>div]:!p-0 [&_.facilities-images-grid>div]:!bg-white [&_.facilities-images-grid>div]:!border-slate-100 [&_.facilities-images-grid>div]:overflow-hidden [&_.facilities-images-grid>div]:flex [&_.facilities-images-grid>div]:flex-col [&_.facilities-images-grid>div]:rounded-xl
                [&_.facilities-images-grid_img]:!m-0 [&_.facilities-images-grid_img]:!w-full [&_.facilities-images-grid_img]:!h-[135px] sm:[&_.facilities-images-grid_img]:!h-[155px] md:[&_.facilities-images-grid_img]:!h-[165px] [&_.facilities-images-grid_img]:!object-cover [&_.facilities-images-grid_img]:!rounded-t-xl [&_.facilities-images-grid_img]:!rounded-b-none [&_.facilities-images-grid_img]:!shadow-none
                [&_.facilities-images-grid_span]:block [&_.facilities-images-grid_span]:p-3 [&_.facilities-images-grid_span]:!bg-white [&_.facilities-images-grid_span]:w-full [&_.facilities-images-grid_span]:empty:hidden [&_.facilities-images-grid_span]:text-[#002b5c] [&_.facilities-images-grid_span]:!mt-auto [&_.facilities-images-grid_span]:!text-[16px] [&_.facilities-images-grid_span]:!font-extrabold [&_.facilities-images-grid_span]:leading-snug
                
                [&_.grid_div_p]:!text-[16px] [&_.grid_div_p]:!font-extrabold [&_.grid_div_p]:!mt-3
                
                [&_.department-contact-us_p:not(:last-child)]:!mb-1 [&_.department-contact-us_p]:!mt-1
                
                [&_iframe]:float-none [&_iframe]:md:float-left [&_iframe]:w-full [&_iframe]:md:w-[400px] [&_iframe]:h-[225px] [&_iframe]:mr-6 [&_iframe]:mb-4 [&_iframe]:rounded-xl [&_iframe]:shadow-md [&_iframe]:border [&_iframe]:border-slate-200`}>
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

          {/* Right Sidebar: Specialties (Matching Old Website Layout) */}
          <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 p-4 xl:p-5">
              <h3 className="text-base font-extrabold text-[#007a87] mb-3 pb-2.5 border-b border-slate-100 uppercase tracking-wide flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-[#007a87] shrink-0" />
                <span>Specialties</span>
              </h3>
              <div className="max-h-[75vh] overflow-y-auto pr-1 space-y-1 scrollbar-thin scrollbar-thumb-teal-100 scrollbar-track-transparent">
                {allDepartments
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((dept) => {
                    const deptSlug = dept.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                    const isActive = dept.id === department.id || deptSlug === resolvedParams.id.toLowerCase();
                    return (
                      <Link
                        key={dept.id}
                        href={`/departments/${deptSlug}`}
                        className={`group flex items-start gap-2 py-2 px-2.5 rounded-xl text-[10.5px] xl:text-[11.5px] font-semibold uppercase tracking-wider transition-all leading-tight ${
                          isActive
                            ? "bg-[#007a87] text-white shadow-sm font-bold"
                            : "text-slate-700 hover:bg-teal-50/80 hover:text-[#007a87]"
                        }`}
                      >
                        <span className={`shrink-0 mt-0.5 transition-transform duration-200 ${isActive ? "text-white" : "text-[#007a87] group-hover:translate-x-0.5"}`}>
                          ➔
                        </span>
                        <span className="whitespace-normal break-words">{dept.name}</span>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

