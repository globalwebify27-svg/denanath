import * as cheerio from "cheerio";

export interface DepartmentSection {
  id: string;
  type: 'rich_text' | 'facilities_images' | 'gallery' | 'faqs';
  title: string;
  content?: string;
  items?: any[];
}

export const STANDARD_SECTION_DEFS: { id: string; title: string; type: DepartmentSection['type']; aliases: string[] }[] = [
  { id: "overview", title: "Overview", type: "rich_text", aliases: ["overview", "about us", "overview :", "about"] },
  { id: "spectrum", title: "Spectrum and Services", type: "rich_text", aliases: ["spectrum and services", "spectrum & services", "spectrum and services :", "services"] },
  { id: "paediatric", title: "Paediatric Liver Clinic", type: "rich_text", aliases: ["paediatric liver clinic", "pediatric liver clinic"] },
  { id: "facilities", title: "Facilities", type: "rich_text", aliases: ["facilities"] },
  { id: "facilitiesImages", title: "Facilities Images", type: "facilities_images", aliases: ["facilities images"] },
  { id: "location", title: "Location of Department", type: "rich_text", aliases: ["location of department", "location of the department", "location"] },
  { id: "timetable", title: "Departmental Timetable", type: "rich_text", aliases: ["departmental timetable", "department timetable", "timetable"] },
  { id: "workload", title: "Departmental Workload", type: "rich_text", aliases: ["departmental workload", "department workload", "workload"] },
  { id: "courses", title: "Courses and Training", type: "rich_text", aliases: ["courses and training", "courses & training", "research projects", "courses"] },
  { id: "events", title: "Events", type: "rich_text", aliases: ["events"] },
  { id: "contactUs", title: "Contact Us", type: "rich_text", aliases: ["contact us", "contact details", "contact"] },
  { id: "gallery", title: "Photo Gallery", type: "gallery", aliases: ["photo gallery", "gallery"] },
  { id: "consultant", title: "Consultant", type: "rich_text", aliases: ["consultant", "consultants"] },
  { id: "faqs", title: "FAQs", type: "faqs", aliases: ["faq", "faqs", "faq's", "frequently asked questions", "specialities", "speciality"] },
];

export function getDefaultDepartmentSections(departmentName?: string): DepartmentSection[] {
  const isOphthalmology = departmentName?.trim().toUpperCase() === "OPHTHALMOLOGY";
  return STANDARD_SECTION_DEFS.map((def) => {
    if (def.id === "faqs" && isOphthalmology) {
      return { id: def.id, type: def.type, title: "Specialities", items: [] };
    }
    if (def.type === "facilities_images" || def.type === "gallery" || def.type === "faqs") {
      return { id: def.id, type: def.type, title: def.title, items: [] };
    }
    return { id: def.id, type: def.type, title: def.title, content: "" };
  });
}

export function parseDepartmentSections(
  description: string | null | undefined,
  departmentName?: string
): DepartmentSection[] {
  const desc = description || "";
  const isOphthalmology = departmentName?.trim().toUpperCase() === "OPHTHALMOLOGY";

  if (!desc.trim()) {
    return getDefaultDepartmentSections(departmentName);
  }

  const $ = cheerio.load(desc, null, false);
  const parsedSections: DepartmentSection[] = [];
  const processedStandardIds = new Set<string>();

  $('section').each((index, el) => {
    const $sec = $(el);
    const $h3 = $sec.find('h3').first();
    const rawTitle = $h3.text().trim();
    if (!rawTitle) return;

    const lowerTitle = rawTitle.toLowerCase();
    const $clone = $sec.clone();
    $clone.find('h3').first().remove();

    if (lowerTitle === "photo gallery" || lowerTitle === "gallery") {
      const galleryItems: { url: string; name: string }[] = [];
      $clone.find('div.bg-slate-50').each((_, card) => {
        const imgEl = $(card).find('img').first();
        const placeholder = $(card).find('div.bg-slate-200').first();
        const pEl = $(card).find('p').first();
        const url = imgEl.attr('src') || placeholder.text() || "";
        const name = pEl.text() || "";
        galleryItems.push({ url, name });
      });
      parsedSections.push({
        id: "gallery",
        type: "gallery",
        title: rawTitle || "Photo Gallery",
        items: galleryItems,
      });
      processedStandardIds.add("gallery");
      return;
    }

    if (["faq", "faqs", "faq's", "frequently asked questions", "specialities", "speciality"].includes(lowerTitle)) {
      const faqItems: { question: string; answer: string }[] = [];
      $clone.find('ul').first().children('li').each((_, li) => {
        const $li = $(li);
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
        const answer = $li.html() ? $li.html()!.trim() : "";
        faqItems.push({ question, answer });
      });
      parsedSections.push({
        id: "faqs",
        type: "faqs",
        title: rawTitle || (isOphthalmology ? "Specialities" : "FAQs"),
        items: faqItems,
      });
      processedStandardIds.add("faqs");
      return;
    }

    if (lowerTitle === "facilities") {
      const facilitiesImageItems: { url: string; name: string }[] = [];
      $clone.find('div.facilities-images-grid > div.bg-slate-50').each((_, card) => {
        const imgEl = $(card).find('img').first();
        const placeholder = $(card).find('div.bg-slate-200').first();
        const textEl = $(card).find('span').length ? $(card).find('span').first() : $(card).find('p').first();
        const url = imgEl.attr('src') || placeholder.text() || "";
        const name = textEl.text() || "";
        facilitiesImageItems.push({ url, name });
      });
      $clone.find('div.facilities-images-grid').remove();

      $clone.find('img.facility-assigned-image, div.facility-assigned-image').each((_, img) => {
        const url = $(img).attr('src') || $(img).text() || "";
        const name = $(img).attr('alt') || "";
        facilitiesImageItems.push({ url, name });
        $(img).closest('.facility-img-wrapper').remove();
      });

      $clone.find('div.facility-item-wrapper').each((_, wrap) => {
        $(wrap).replaceWith($(wrap).html() || "");
      });

      parsedSections.push({
        id: "facilities",
        type: "rich_text",
        title: rawTitle || "Facilities",
        content: ($clone.html() || "").trim(),
      });
      processedStandardIds.add("facilities");

      parsedSections.push({
        id: "facilitiesImages",
        type: "facilities_images",
        title: "Facilities Images",
        items: facilitiesImageItems,
      });
      processedStandardIds.add("facilitiesImages");
      return;
    }

    if (lowerTitle === "consultant" || lowerTitle === "consultants") {
      let consultantHtml = $clone.html() || "";
      const consultantNames: string[] = [];
      $clone.find('p, li, h4').each((_, p) => {
        let text = $(p).text().trim();
        text = text.replace(/^(?:[A-Z]\s*)+Dr\./, 'Dr.').replace(/&nbsp;/g, ' ').trim();
        if (text && text.length > 2) {
          consultantNames.push(text);
        }
      });
      if (consultantNames.length > 0) {
        consultantHtml = consultantNames.map((name) => `<p>${name}</p>`).join('');
      }
      parsedSections.push({
        id: "consultant",
        type: "rich_text",
        title: rawTitle || "Consultant",
        content: consultantHtml.trim(),
      });
      processedStandardIds.add("consultant");
      return;
    }

    // Match with other standard sections using aliases
    const matchedStandard = STANDARD_SECTION_DEFS.find((s) => {
      if (s.type !== "rich_text") return false;
      return s.aliases.some((alias) => alias === lowerTitle || lowerTitle.startsWith(alias));
    });

    if (matchedStandard && !processedStandardIds.has(matchedStandard.id)) {
      parsedSections.push({
        id: matchedStandard.id,
        type: "rich_text",
        title: rawTitle,
        content: ($clone.html() || "").trim(),
      });
      processedStandardIds.add(matchedStandard.id);
    } else {
      const customId = `custom_${index}_${Date.now()}`;
      parsedSections.push({
        id: customId,
        type: "rich_text",
        title: rawTitle,
        content: ($clone.html() || "").trim(),
      });
    }
  });

  // Append any standard sections that were not yet in description
  for (const def of STANDARD_SECTION_DEFS) {
    if (!processedStandardIds.has(def.id)) {
      if (def.id === "faqs" && isOphthalmology) {
        parsedSections.push({ id: def.id, type: def.type, title: "Specialities", items: [] });
      } else if (def.type === "facilities_images" || def.type === "gallery" || def.type === "faqs") {
        parsedSections.push({ id: def.id, type: def.type, title: def.title, items: [] });
      } else {
        parsedSections.push({ id: def.id, type: def.type, title: def.title, content: "" });
      }
    }
  }

  return parsedSections;
}

export async function buildDepartmentDescription(
  formData: FormData,
  departmentName?: string
): Promise<string> {
  const cleanHtml = (html: string | null) => {
    if (!html) return '';
    return html.replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '').trim();
  };

  const secOrderJson = formData.get("sec_order") as string;
  let secOrder: string[] = [];
  if (secOrderJson) {
    try {
      secOrder = JSON.parse(secOrderJson);
    } catch (e) {
      secOrder = [];
    }
  }

  // Publication Link (if any)
  const publicationLink = (formData.get("publicationLink") as string || "").trim();
  const publicationLinkText = (formData.get("publicationLinkText") as string || "View Details").trim();
  let publicationHtml = "";
  if (publicationLink) {
    publicationHtml = `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Publications / Link</h3><p><a href="${publicationLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#007a87] text-white font-bold text-sm rounded-xl hover:bg-[#005f69] transition-colors">${publicationLinkText || 'View Details'}</a></p></section>`;
  }

  // Extract facilities images items
  let facilitiesImagesItems: any[] = [];
  for (const id of secOrder) {
    const rawFacilitiesImages = formData.get(`sec_facilities_images_${id}`) as string;
    if (rawFacilitiesImages) {
      try {
        const parsed = JSON.parse(rawFacilitiesImages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          facilitiesImagesItems = parsed.filter(
            (img: any) => img && typeof img.url === 'string' && img.url.trim() !== '' && !img.url.startsWith('Image:')
          );
        }
      } catch (e) {}
    }
  }

  const sectionsHtmlArr: string[] = [];

  for (const id of secOrder) {
    const type = (formData.get(`sec_type_${id}`) as string) || 'rich_text';
    const title = ((formData.get(`sec_title_${id}`) as string) || '').trim();

    if (type === 'rich_text') {
      let content = cleanHtml(formData.get(`sec_content_${id}`) as string);

      // Attach facilities images if this is the facilities section
      if ((id === 'facilities' || title.toLowerCase() === 'facilities') && facilitiesImagesItems.length > 0) {
        const facilitiesGridHtml = `
    <div class="facilities-images-grid col-span-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      ${facilitiesImagesItems.map((img: any) => `
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-teal-100 shadow-sm">
        <img src="${img.url}" alt="${img.name || ''}" class="w-full h-32 object-cover rounded-lg mb-2 shadow-sm" />
        <span class="block font-bold text-[#007a87] m-0 text-sm mt-3">${img.name || ''}</span>
      </div>`).join('')}
    </div>`;
        content = (content || '') + facilitiesGridHtml;
      }

      if (title && content) {
        sectionsHtmlArr.push(`  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">${title}</h3>${content}</section>`);
      }
    } else if (type === 'gallery') {
      const galleryJson = formData.get(`sec_gallery_${id}`) as string;
      let galleryHtml = "";
      if (galleryJson) {
        try {
          const rawItems = JSON.parse(galleryJson);
          const items = Array.isArray(rawItems)
            ? rawItems.filter((img: any) => img && typeof img.url === 'string' && img.url.trim() !== '' && !img.url.startsWith('Image:'))
            : [];
          if (items.length > 0) {
            galleryHtml = `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      ${items.map((img: any) => `
      <div class="bg-slate-50 rounded-xl text-center border border-slate-200 overflow-hidden flex flex-col">
        <img src="${img.url}" alt="${img.name || ''}" class="w-full h-48 object-cover m-0" />
        <div class="p-4 flex-grow flex items-center justify-center">
          <p class="font-bold text-[#002b5c] m-0">${img.name || ''}</p>
        </div>
      </div>`).join('')}
    </div>`;
          }
        } catch (e) {
          galleryHtml = galleryJson;
        }
      }
      if (galleryHtml) {
        sectionsHtmlArr.push(`  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">${title || 'Photo Gallery'}</h3>${galleryHtml}</section>`);
      }
    } else if (type === 'faqs') {
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
      if (faqHtml) {
        const isOphthalmology = departmentName?.trim().toUpperCase() === "OPHTHALMOLOGY";
        const defaultTitle = isOphthalmology ? "Specialities" : "FAQs";
        sectionsHtmlArr.push(`  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">${title || defaultTitle}</h3>${faqHtml}</section>`);
      }
    } else if (type === 'facilities_images') {
      // If there was no rich_text facilities section in the order, but facilities images exist:
      const hasFacilitiesRichText = secOrder.some(
        (sId) => sId === 'facilities' || ((formData.get(`sec_title_${sId}`) as string) || '').toLowerCase() === 'facilities'
      );
      if (!hasFacilitiesRichText && facilitiesImagesItems.length > 0) {
        const facilitiesGridHtml = `
    <div class="facilities-images-grid col-span-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      ${facilitiesImagesItems.map((img: any) => `
      <div class="bg-slate-50 p-4 rounded-xl text-center border border-teal-100 shadow-sm">
        <img src="${img.url}" alt="${img.name}" class="w-full h-32 object-cover rounded-lg mb-2 shadow-sm" />
        <span class="block font-bold text-[#007a87] m-0 text-sm mt-3">${img.name}</span>
      </div>`).join('')}
    </div>`;
        sectionsHtmlArr.push(`  <section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">${title || 'Facilities'}</h3>${facilitiesGridHtml}</section>`);
      }
    }
  }

  return `
<div class="space-y-8 text-slate-700">
  ${publicationHtml}
${sectionsHtmlArr.join('\n')}
</div>
  `.trim();
}
