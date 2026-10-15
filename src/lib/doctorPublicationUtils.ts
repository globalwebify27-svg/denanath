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
 * Returns a standardized, clean publication filename including doctor name and details.
 * Example: "Dr_JOSHI_RAJAN_101_Publication_1.pdf" or "Dr_JOSHI_RAJAN_101_Clinical_Research.pdf"
 */
export function getDoctorPublicationFileName(doctor: any, item: any, index: number): string {
  const docCode = String(doctor?.dmhDoctorId || doctor?.doctor_id || doctor?.id || "").trim();
  const rawDocName = (doctor?.name || "Doctor").trim();
  // Standardize doc name without dots (e.g. "Dr" instead of "Dr.")
  const cleanDocName = sanitizeFileName(rawDocName.replace(/\./g, ""));

  let title = typeof item === "string" ? item : (item?.title || "");
  title = title.replace(/\[PDF\]/gi, "").trim();

  // Strip doctor name and doc code from title if already present in title string
  let cleanTitle = title;
  if (rawDocName) {
    cleanTitle = cleanTitle.replace(new RegExp(rawDocName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "");
  }
  const nameWithoutDr = rawDocName.replace(/^Dr\.?\s*/i, "").trim();
  if (nameWithoutDr) {
    cleanTitle = cleanTitle.replace(new RegExp(nameWithoutDr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "");
  }
  if (docCode) {
    cleanTitle = cleanTitle.replace(new RegExp(`\\(?${docCode}\\)?`, "gi"), "");
  }
  cleanTitle = cleanTitle.replace(/^[\s:_\-\(\)]+/, "").replace(/[\s:_\-\(\)]+$/, "").trim();

  if (!cleanTitle || cleanTitle.toLowerCase() === "view pdf link" || cleanTitle.toLowerCase() === "pdf") {
    cleanTitle = `Publication_${index + 1}`;
  }

  const base = sanitizeFileName(`${cleanDocName}${docCode ? `_${docCode}` : ""}_${cleanTitle}`);
  return `${base || `Doctor_Publication_${index + 1}`}.pdf`;
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
 * Parses and returns publication title, link, docCode, and ready-to-use URLs
 * consistently across all doctor views.
 */
export function getDoctorPublicationDetails(doctor: any, item: any, index: number) {
  let rawTitle = "";
  let link = "";

  if (typeof item === "string") {
    rawTitle = item;
  } else if (item && typeof item === "object") {
    rawTitle = item.title || "";
    link = item.link || "";
  }

  const docCode = String(doctor?.dmhDoctorId || doctor?.doctor_id || doctor?.id || "").trim();
  const docPrefix = `${doctor?.name || "Doctor"}${docCode ? ` (${docCode})` : ""}`;

  let title = rawTitle;
  if (!title || title.trim().toLowerCase() === "view pdf link") {
    title = `${docPrefix} - Publication ${index + 1}`;
  } else if (docCode && !title.includes(docCode)) {
    if (!title.toLowerCase().includes((doctor?.name || "").toLowerCase())) {
      title = `${docPrefix} - ${title}`;
    } else {
      title = `${docPrefix} - ${title.replace(doctor?.name || "", "").replace(/^[\s:-]+/, "") || `Publication ${index + 1}`}`;
    }
  }

  const displayTitle = title.replace(/\[PDF\]/g, "").trim();
  const fileName = getDoctorPublicationFileName(doctor, item, index);
  const downloadUrl = getDoctorPublicationDownloadUrl(link, fileName);
  const viewUrl = getDoctorPublicationViewUrl(link, fileName);

  return {
    rawTitle,
    displayTitle,
    docCode,
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
