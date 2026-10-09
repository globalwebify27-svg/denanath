const MONTHS_MAP: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

/**
 * Parses a month/year string into a numeric sort key (e.g., "September 2026" -> 202609).
 * Returns 0 if parsing fails.
 */
export function parseMonthYear(str?: string | null): number {
  if (!str || typeof str !== "string") return 0;
  const clean = str.trim().toLowerCase();
  if (!clean) return 0;

  // 1. Month name + Year: "April 2026", "Sept 2025", "May, 2026", "August-2025", "2026 April", "May 26"
  const textMatch =
    clean.match(/([a-z]+)[\s,\-\/\.]+(\d{2,4})/i) ||
    clean.match(/(\d{2,4})[\s,\-\/\.]+([a-z]+)/i);

  if (textMatch) {
    const isFirstNum = !isNaN(Number(textMatch[1]));
    const wordPart = isFirstNum ? textMatch[2] : textMatch[1];
    const yearPart = isFirstNum ? textMatch[1] : textMatch[2];
    const word = wordPart.toLowerCase().replace(/[^a-z]/g, "");
    let year = parseInt(yearPart, 10);
    if (year < 100) year += 2000;

    for (const [key, mNum] of Object.entries(MONTHS_MAP)) {
      if (word.startsWith(key) || key.startsWith(word)) {
        return year * 100 + mNum;
      }
    }
  }

  // 2. Numeric MM/YYYY or MM-YYYY or MM/YY
  const numMatch1 = clean.match(/^(\d{1,2})[\/\-\.](\d{2,4})$/);
  if (numMatch1) {
    let year = parseInt(numMatch1[2], 10);
    if (year < 100) year += 2000;
    const m = parseInt(numMatch1[1], 10);
    if (m >= 1 && m <= 12) return year * 100 + m;
  }

  // 3. Numeric ISO YYYY-MM or YYYY/MM
  const numMatch2 = clean.match(/^(\d{4})[\/\-\.](\d{1,2})$/);
  if (numMatch2) {
    const year = parseInt(numMatch2[1], 10);
    const m = parseInt(numMatch2[2], 10);
    if (m >= 1 && m <= 12) return year * 100 + m;
  }

  // 4. Standard Date fallback
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return d.getFullYear() * 100 + (d.getMonth() + 1);
  }

  // 5. Fallback: extract 4-digit year if present
  const yMatch = clean.match(/\d{4}/);
  if (yMatch) {
    return parseInt(yMatch[0], 10) * 100;
  }

  return 0;
}

/**
 * Sorts charity monthly records in descending order (latest month/year first).
 * Records with unparseable months are placed at the end while maintaining relative order.
 */
export function sortCharityRecordsDescending<T extends { month?: string }>(records: T[]): T[] {
  if (!Array.isArray(records)) return [];
  return [...records].sort((a, b) => {
    const valA = parseMonthYear(a?.month || "");
    const valB = parseMonthYear(b?.month || "");
    if (valA === valB) return 0;
    return valB - valA;
  });
}
