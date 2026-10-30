import React from "react";

/**
 * Utility functions for handling Doctor Publications and PDF downloads
 * following DRY principles.
 */

// Helper to sanitize filename for all OS file systems (Mac, Windows, Linux, Android, iOS)
export function sanitizeFileName(str: string): string {
  return str
    .replace(/[<>:"/\\|?*]+/g, " ")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/**
 * Returns a standardized, clean publication filename including doctor name without doctor ID.
 * Example: "Dr_AGARKHEDKAR_NIKHIL_Publication.pdf" or "Dr_JOSHI_RAJAN_Publication_1.pdf"
 */
export function getDoctorPublicationFileName(
  doctor: any, 
  item: any, 
  index: number,
  totalCount?: number
): string {
  const docCode = String(doctor?.dmhDoctorId || doctor?.doctor_id || doctor?.id || "").trim();
  const rawDocName = (doctor?.name || "Doctor").trim();
  // Standardize doc name without dots (e.g. "Dr" instead of "Dr.")
  const cleanDocName = sanitizeFileName(rawDocName.replace(/\./g, ""));
  const totalPubs = totalCount ?? (Array.isArray(doctor?.publications) ? doctor.publications.length : 1);

  let title = typeof item === "string" ? item : (item?.title || "");
  title = title.replace(/\[PDF\]/gi, "").trim();

  // Strip doctor code and bracketed IDs from title
  if (docCode) {
    title = title.replace(new RegExp(`\\(?${docCode}\\)?`, "gi"), "");
  }
  title = title.replace(/\s*\(\s*\d+\s*\)/g, "");

  // Strip doctor name from title if already present in title string
  let cleanTitle = title;
  if (rawDocName) {
    cleanTitle = cleanTitle.replace(new RegExp(rawDocName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "");
  }
  const nameWithoutDr = rawDocName.replace(/^Dr\.?\s*/i, "").trim();
  if (nameWithoutDr) {
    cleanTitle = cleanTitle.replace(new RegExp(nameWithoutDr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "");
  }
  cleanTitle = cleanTitle.replace(/^[\s:_\-\(\)]+/, "").replace(/[\s:_\-\(\)]+$/, "").trim();

  if (/^publication[_\s]*\d*$/i.test(cleanTitle) || !cleanTitle || cleanTitle.toLowerCase() === "view pdf link" || cleanTitle.toLowerCase() === "pdf") {
    cleanTitle = totalPubs <= 1 ? "Publication" : `Publication_${index + 1}`;
  } else {
    cleanTitle = sanitizeFileName(cleanTitle);
  }

  // Filename contains doctor name and publication title (NO doctor ID)
  const base = sanitizeFileName(`${cleanDocName}_${cleanTitle}`);
  return `${base || (totalPubs <= 1 ? "Doctor_Publication" : `Doctor_Publication_${index + 1}`)}.pdf`;
}

/**
 * Builds direct download URL.
 * If Cloudinary: inserts /fl_attachment:<fileNameWithoutExt>/ into the URL, which instructs Cloudinary
 * to return "Content-Disposition: attachment; filename=<filename>.pdf".
 * If non-Cloudinary: uses /api/doctor-publication-pdf?download=1&name=<filename>&url=<url>
 */
export function getDoctorPublicationDownloadUrl(url: string, fileName: string): string {
  if (!url) return "";
  const nameWithoutExt = fileName.replace(/\.pdf$/i, "").trim();
  // Safe filename for Cloudinary fl_attachment (alphanumeric, spaces or underscores)
  const safeCldName = encodeURIComponent(nameWithoutExt.replace(/[^a-zA-Z0-9_\-\s]/g, "_"));

  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    if (url.includes("/fl_attachment:")) {
      return url.replace(/\/fl_attachment:[^/]+/, `/fl_attachment:${safeCldName}`);
    }
    return url.replace("/upload/", `/upload/fl_attachment:${safeCldName}/`);
  }

  return `/api/doctor-publication-pdf?download=1&name=${encodeURIComponent(fileName)}&url=${encodeURIComponent(url)}`;
}

/**
 * Builds view URL that serves inline with custom Content-Disposition filename so browser PDF viewer
 * uses the doctor's name if the user clicks the browser's download/save icon.
 */
export function getDoctorPublicationViewUrl(url: string, fileName: string): string {
  if (!url) return "";
  return `/api/doctor-publication-pdf?name=${encodeURIComponent(fileName)}&url=${encodeURIComponent(url)}`;
}

/**
 * Parses and returns publication title, link, and ready-to-use URLs
 * consistently across all doctor views, with doctor ID stripped.
 */
export function getDoctorPublicationDetails(
  doctor: any, 
  item: any, 
  index: number,
  totalCount?: number
) {
  let rawTitle = "";
  let link = "";

  if (typeof item === "string") {
    rawTitle = item;
  } else if (item && typeof item === "object") {
    rawTitle = item.title || "";
    link = item.link || "";
  }

  const docCode = String(doctor?.dmhDoctorId || doctor?.doctor_id || doctor?.id || "").trim();
  const docName = (doctor?.name || "Doctor").trim();
  const totalPubs = totalCount ?? (Array.isArray(doctor?.publications) ? doctor.publications.length : 1);

  // 1. Remove docCode and bracketed ID numbers from rawTitle (e.g. "(3678)" or "(101)")
  let title = rawTitle;
  if (docCode) {
    title = title.replace(new RegExp(`\\s*\\(?${docCode}\\)?`, "gi"), "");
  }
  title = title.replace(/\s*\(\s*\d+\s*\)/g, "");

  // 2. Remove "Doctor Name" if it appears at the start of title to avoid duplicate names
  const nameEscaped = docName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  title = title.replace(new RegExp(`^${nameEscaped}\\s*[-:]*\\s*`, "i"), "");
  const nameWithoutDr = docName.replace(/^Dr\.?\s*/i, "").trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (nameWithoutDr) {
    title = title.replace(new RegExp(`^${nameWithoutDr}\\s*[-:]*\\s*`, "i"), "");
  }

  // 3. Handle publication numbering
  if (!title || title.trim().toLowerCase() === "view pdf link" || /^publication\s*\d*$/i.test(title.trim())) {
    title = totalPubs <= 1 ? "Publication" : `Publication ${index + 1}`;
  } else if (totalPubs <= 1) {
    // If only 1 publication, strip number suffix like "Publication 1" -> "Publication"
    title = title.replace(/\bPublication\s*1\b/i, "Publication");
  }

  // Clean trailing/leading dashes or colons
  title = title.replace(/^[\s:-]+/, "").replace(/[\s:-]+$/, "").trim();

  // Clean title without ID or bracket
  const displayTitle = `${docName} - ${title}`.replace(/\[PDF\]/g, "").trim();
  const fileName = getDoctorPublicationFileName(doctor, item, index, totalPubs);
  const downloadUrl = getDoctorPublicationDownloadUrl(link, fileName);
  const viewUrl = getDoctorPublicationViewUrl(link, fileName);

  return {
    rawTitle,
    displayTitle,
    docCode: "", // Intentionally empty so UI doesn't render "Doctor Code: ..."
    showBadge: totalPubs > 1,
    badgeNumber: index + 1,
    link,
    fileName,
    downloadUrl,
    viewUrl,
  };
}

/**
 * Client-side download trigger with blob fallback to guarantee file rename across all browsers.
 */
export async function triggerDoctorPdfDownload(
  e: React.MouseEvent,
  url: string,
  fileName: string
): Promise<void> {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fetch failed");
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  } catch (err) {
    console.warn("Direct blob download failed, falling back to link navigation:", err);
    window.open(url, "_blank");
  }
}
