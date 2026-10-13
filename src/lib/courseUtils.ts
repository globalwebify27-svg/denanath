export function getCourseTimestamp(c: any): number {
  if (!c) return 0;
  if (c.createdAt) {
    const t = new Date(c.createdAt).getTime();
    if (!isNaN(t) && t > 0) return t;
  }
  if (c.id && typeof c.id === 'string') {
    const match = c.id.match(/\b(?:left|right)-(\d{12,})\b/);
    if (match) {
      const t = Number(match[1]);
      if (!isNaN(t) && t > 0) return t;
    }
  }
  return 0;
}

export function sortCoursesLatestFirst(courses: any[]): any[] {
  if (!Array.isArray(courses)) return [];
  const withTimestamps = courses.filter(c => getCourseTimestamp(c) > 0);
  const legacy = courses.filter(c => getCourseTimestamp(c) === 0);

  // Sort descending: newest added course comes first
  withTimestamps.sort((a, b) => getCourseTimestamp(b) - getCourseTimestamp(a));

  return [...withTimestamps, ...legacy];
}
