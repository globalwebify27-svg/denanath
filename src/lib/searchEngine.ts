import { prisma } from "@/lib/prisma";
import type { Department, Doctor, Service } from "@prisma/client";
import { SITE_SEARCH_CATALOG, SiteCatalogItem } from "./siteSearchCatalog";

export interface SearchPageResult {
  id: string;
  title: string;
  category: string;
  href: string;
  description: string;
  matchedSnippet?: string;
  score: number;
}

export interface SearchDepartmentResult {
  id: string;
  name: string;
  description?: string;
  href: string;
}

export interface SearchDoctorResult {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  image?: string;
  dmhDoctorId?: string;
  profileHref: string;
  appointmentHref: string;
}

export interface SearchServiceResult {
  id: string;
  title: string;
  href: string;
}

export interface GlobalSearchResults {
  query: string;
  totalResults: number;
  pages: SearchPageResult[];
  departments: SearchDepartmentResult[];
  doctors: SearchDoctorResult[];
  services: SearchServiceResult[];
}

// Helper: Extract human-readable text from JSON stored in siteSetting
function extractTextFromSetting(settingValue: string): string {
  try {
    const parsed = JSON.parse(settingValue);
    const texts: string[] = [];
    const walk = (obj: any) => {
      if (!obj) return;
      if (typeof obj === "string") {
        texts.push(obj.replace(/<[^>]*>?/gm, " "));
      } else if (Array.isArray(obj)) {
        obj.forEach(walk);
      } else if (typeof obj === "object") {
        Object.values(obj).forEach(walk);
      }
    };
    walk(parsed);
    return texts.join(" ").replace(/\s+/g, " ").trim();
  } catch (e) {
    return settingValue.replace(/<[^>]*>?/gm, " ");
  }
}

export async function performGlobalSearch(rawQuery: string): Promise<GlobalSearchResults> {
  const query = (rawQuery || "").trim();
  if (!query) {
    return {
      query: "",
      totalResults: 0,
      pages: [],
      departments: [],
      doctors: [],
      services: [],
    };
  }

  const queryLower = query.toLowerCase();
  const tokens = queryLower.split(/\s+/).filter(Boolean);

  // 1. Fetch relevant siteSettings in parallel
  const settingKeys = SITE_SEARCH_CATALOG.map((c) => c.settingKey).filter(Boolean) as string[];
  const siteSettings = await prisma.siteSetting.findMany({
    where: { key: { in: settingKeys } },
    select: { key: true, value: true },
  });
  const settingsMap = new Map<string, string>();
  siteSettings.forEach((s: { key: string; value: string | null }) => {
    if (s.value) settingsMap.set(s.key, extractTextFromSetting(s.value));
  });

  // 2. Fetch DB entities in parallel
  const [dbDepartments, dbDoctors, dbServices, dbDynamicPages] = await Promise.all([
    // Departments
    prisma.department.findMany({
      where: {
        status: true,
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { seoKeywords: { contains: query } },
          { headOfDepartment: { contains: query } },
        ],
      },
    }),

    // Doctors
    prisma.doctor.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { specialty: { contains: query } },
          { qualifications: { contains: query } },
          { consultantType: { contains: query } },
        ],
      },
      take: 24,
    }),

    // Services
    prisma.service.findMany({
      where: {
        status: true,
        OR: [
          { title: { contains: query } },
          { seoKeywords: { contains: query } },
          { seoMetaDescription: { contains: query } },
        ],
      },
    }),

    // Dynamic Pages (Active only, excluding test / dummy pages)
    prisma.dynamicPage.findMany({
      where: {
        status: true,
        OR: [
          { title: { contains: query } },
          { content: { contains: query } },
          { seoKeywords: { contains: query } },
        ],
      },
    }),
  ]);

  // 3. Score and Match Pages from Catalog
  const matchedPages: SearchPageResult[] = [];
  const knownHrefs = new Set<string>();

  for (const item of SITE_SEARCH_CATALOG) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const keywordsJoined = item.keywords.join(" ").toLowerCase();
    const settingContent = item.settingKey ? settingsMap.get(item.settingKey) || "" : "";
    const settingContentLower = settingContent.toLowerCase();

    // Exact title match gets super high score
    if (titleLower === queryLower) {
      score += 100;
    } else if (titleLower.includes(queryLower)) {
      score += 50;
    }

    // Special guarantee for Charity
    if (queryLower.includes("charity") && item.id === "charity-details") {
      score += 200;
    }

    // Token scoring
    for (const token of tokens) {
      if (titleLower.includes(token)) score += 30;
      if (keywordsJoined.includes(token)) score += 20;
      if (descLower.includes(token)) score += 10;
      if (settingContentLower.includes(token)) score += 5;
    }

    if (score > 0) {
      let snippet = item.description;
      if (settingContent) {
        // Find position of query in setting text to extract contextual snippet
        const idx = settingContentLower.indexOf(queryLower);
        if (idx !== -1) {
          const start = Math.max(0, idx - 40);
          const end = Math.min(settingContent.length, idx + queryLower.length + 80);
          snippet = (start > 0 ? "..." : "") + settingContent.slice(start, end).trim() + (end < settingContent.length ? "..." : "");
        }
      }

      matchedPages.push({
        id: item.id,
        title: item.title,
        category: item.category,
        href: item.href,
        description: snippet,
        matchedSnippet: snippet,
        score,
      });
      knownHrefs.add(item.href.toLowerCase());
    }
  }

  // 4. Merge Genuine Dynamic Pages (Ensure no duplicate of canonical pages)
  const blacklistSlugs = new Set(["charity", "diagnosis", "basic-infrastructure", "room-photo", "pillar-of-support", "values", "indoor-map"]);
  
  for (const page of dbDynamicPages) {
    const pageHref = `/${page.slug}`.toLowerCase();
    if (knownHrefs.has(pageHref) || blacklistSlugs.has(page.slug.toLowerCase())) {
      continue;
    }

    const titleLower = page.title.toLowerCase();
    const cleanContent = (page.content || "").replace(/<[^>]*>?/gm, " ").trim();
    const contentLower = cleanContent.toLowerCase();

    let score = 0;
    if (titleLower === queryLower) score += 90;
    else if (titleLower.includes(queryLower)) score += 40;

    for (const token of tokens) {
      if (titleLower.includes(token)) score += 25;
      if (contentLower.includes(token)) score += 5;
    }

    if (score > 0) {
      let snippet = cleanContent.slice(0, 140) + (cleanContent.length > 140 ? "..." : "");
      const idx = contentLower.indexOf(queryLower);
      if (idx !== -1) {
        const start = Math.max(0, idx - 30);
        const end = Math.min(cleanContent.length, idx + queryLower.length + 70);
        snippet = (start > 0 ? "..." : "") + cleanContent.slice(start, end).trim() + "...";
      }

      matchedPages.push({
        id: page.id,
        title: page.title,
        category: page.navbarMenu || "Hospital Pages",
        href: `/${page.slug}`,
        description: snippet,
        matchedSnippet: snippet,
        score,
      });
      knownHrefs.add(pageHref);
    }
  }

  // Sort pages by score descending
  matchedPages.sort((a, b) => b.score - a.score);

  // 5. Format Departments
  const departments: SearchDepartmentResult[] = dbDepartments.map((dept: Department) => {
    const slug = dept.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return {
      id: dept.id,
      name: dept.name,
      description: dept.description?.replace(/<[^>]*>?/gm, "").substring(0, 140),
      href: `/departments/${slug}`,
    };
  });

  // 6. Format Doctors
  const doctors: SearchDoctorResult[] = dbDoctors.map((doc: Doctor) => ({
    id: doc.id,
    name: doc.name,
    specialty: doc.specialty || "Specialist",
    qualifications: doc.qualifications || "MBBS, MD",
    image: doc.image || undefined,
    dmhDoctorId: doc.dmhDoctorId || undefined,
    profileHref: `/doctors-profile/${doc.id}`,
    appointmentHref: doc.dmhDoctorId
      ? `/Appointment?doctorid=${doc.dmhDoctorId}`
      : `/Appointment`,
  }));

  // 7. Format Services
  const services: SearchServiceResult[] = dbServices.map((svc: Service) => ({
    id: svc.id,
    title: svc.title,
    href: `/services`,
  }));

  const totalResults = matchedPages.length + departments.length + doctors.length + services.length;

  return {
    query,
    totalResults,
    pages: matchedPages,
    departments,
    doctors,
    services,
  };
}
