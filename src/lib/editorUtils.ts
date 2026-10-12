// Server & Client friendly editor list helpers without 'use client'

export function cleanItem(str: string): string {
  if (!str) return '';
  let cleaned = str
    .replace(/&nbsp;/g, ' ')
    .replace(/^<p[^>]*>/i, '')
    .replace(/<\/p>$/i, '')
    .replace(/^<li[^>]*>/i, '')
    .replace(/<\/li>$/i, '')
    .replace(/^[\s\u2022•\-\*]+/, '')
    .replace(/^\d+[\.\)]\s*/, '')
    .trim();

  // If the item only consists of tags with no text, return empty string
  const textOnly = cleaned.replace(/<[^>]*>/g, '').trim();
  if (!textOnly) return '';

  return cleaned;
}

export function parseHtmlToList(html: any): string[] {
  if (!html) return [];
  if (Array.isArray(html)) {
    const hasHtmlTags = html.some(it => typeof it === 'string' && /<\/?(p|li|ul|ol|br|div)[^>]*>/i.test(it));
    if (hasHtmlTags) {
      return parseHtmlToList(html.join(' '));
    }
    return html.map(s => (typeof s === 'string' ? cleanItem(s) : String(s))).filter(Boolean);
  }
  if (typeof html !== 'string') return [];

  const trimmed = html.trim();
  if (!trimmed) return [];

  const liMatches = trimmed.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
  if (liMatches && liMatches.length > 0) {
    return liMatches
      .map(li => {
        const inner = li.replace(/^<li[^>]*>/i, '').replace(/<\/li>$/i, '');
        return cleanItem(inner);
      })
      .filter(Boolean);
  }

  const pMatches = trimmed.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
  if (pMatches && pMatches.length > 0) {
    return pMatches
      .map(p => {
        const inner = p.replace(/^<p[^>]*>/i, '').replace(/<\/p>$/i, '');
        return cleanItem(inner);
      })
      .filter(Boolean);
  }

  return trimmed
    .replace(/<br\s*\/?>/gi, '\n')
    .split(/[\n,]/)
    .map(s => cleanItem(s))
    .filter(Boolean);
}

export function formatListToHtml(input: any, defaultItems: string[] = []): string {
  const items = parseHtmlToList(input);
  const finalItems = items.length > 0 ? items : defaultItems;
  return `<ul>\n${finalItems.map(it => `  <li>${it}</li>`).join('\n')}\n</ul>`;
}

export function normalizeEditorContent(raw: any, forceList = false): string {
  if (!raw) return "";
  
  if (Array.isArray(raw)) {
    const cleanItems = raw.map(item => (typeof item === 'string' ? cleanItem(item) : String(item))).filter(Boolean);
    if (cleanItems.length === 0) return "";
    return `<ul>\n${cleanItems.map(it => `  <li>${it}</li>`).join('\n')}\n</ul>`;
  }

  if (typeof raw !== 'string') return String(raw);

  const trimmed = raw.trim();
  if (!trimmed) return "";

  if (/<(ul|ol)[^>]*>/i.test(trimmed)) {
    return trimmed;
  }

  if (forceList) {
    const items = parseHtmlToList(trimmed);
    if (items.length > 0) {
      return `<ul>\n${items.map(l => `  <li>${l}</li>`).join('\n')}\n</ul>`;
    }
  }

  const hasBulletMarkers = /(?:^|[\n\r]|<p[^>]*>|<br\s*\/?>)\s*(?:[•\-\*]|\u2022|\d+[\.\)])\s+/i.test(trimmed);
  if (hasBulletMarkers) {
    const lines = trimmed
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?p[^>]*>/gi, '\n')
      .split('\n')
      .map(line => line.replace(/^[\s\u2022•\-\*]+/, '').replace(/^\d+[\.\)]\s*/, '').trim())
      .filter(Boolean);

    if (lines.length > 0) {
      return `<ul>\n${lines.map(l => `  <li>${l}</li>`).join('\n')}\n</ul>`;
    }
  }

  const hasHtml = /<[a-z][\s\S]*>/i.test(trimmed);
  if (!hasHtml && trimmed.includes('\n')) {
    const lines = trimmed.split('\n').map(s => s.trim()).filter(Boolean);
    if (lines.length > 1) {
      return `<ul>\n${lines.map(l => `  <li>${l}</li>`).join('\n')}\n</ul>`;
    }
  }

  return trimmed;
}
