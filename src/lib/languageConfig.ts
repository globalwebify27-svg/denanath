// Centralized Language Configuration & Utilities (DRY Principle)

export interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
];

export const DEFAULT_LANGUAGE = 'en';

export function getLanguageByCode(code?: string | null): LanguageOption {
  if (!code) return SUPPORTED_LANGUAGES[0];
  const found = SUPPORTED_LANGUAGES.find((l) => l.code.toLowerCase() === code.toLowerCase());
  return found || SUPPORTED_LANGUAGES[0];
}

export function getActiveLanguage(): string {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  try {
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2,3})/);
    if (match && match[1]) {
      const code = match[1].toLowerCase();
      if (SUPPORTED_LANGUAGES.some((l) => l.code === code)) {
        return code;
      }
    }
    const directMatch = document.cookie.match(/googtrans=([a-z]{2,3})/);
    if (directMatch && directMatch[1]) {
      const code = directMatch[1].toLowerCase();
      if (SUPPORTED_LANGUAGES.some((l) => l.code === code)) {
        return code;
      }
    }
  } catch (e) {
    console.error("Error reading language cookie:", e);
  }
  return DEFAULT_LANGUAGE;
}

export function setLanguageCookie(langCode: string): void {
  if (typeof window === 'undefined') return;

  const hostname = window.location.hostname;
  const isClear = !langCode || langCode === 'en';
  const val = isClear ? '' : `/en/${langCode}`;
  const expires = isClear ? 'expires=Thu, 01 Jan 1970 00:00:00 UTC;' : 'max-age=31536000;';

  // 1. Root path without explicit domain
  document.cookie = isClear
    ? `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    : `googtrans=${val}; path=/; ${expires}`;

  // 2. Current hostname
  document.cookie = isClear
    ? `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${hostname}; path=/;`
    : `googtrans=${val}; domain=${hostname}; path=/; ${expires}`;

  // 3. Dot hostname
  if (!hostname.startsWith('.')) {
    document.cookie = isClear
      ? `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${hostname}; path=/;`
      : `googtrans=${val}; domain=.${hostname}; path=/; ${expires}`;
  }

  // 4. Root domain if on a subdomain
  const parts = hostname.split('.');
  if (parts.length > 2) {
    const rootDomain = parts.slice(-2).join('.');
    document.cookie = isClear
      ? `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${rootDomain}; path=/;`
      : `googtrans=${val}; domain=.${rootDomain}; path=/; ${expires}`;
  }
}
