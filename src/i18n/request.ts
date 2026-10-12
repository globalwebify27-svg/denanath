import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/lib/languageConfig';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const googtrans = cookieStore.get('googtrans')?.value;
  
  let locale = DEFAULT_LANGUAGE;
  if (googtrans) {
    // format is typically /en/hi
    const match = googtrans.match(/\/en\/([a-z]{2,3})/);
    if (match && match[1]) {
      locale = match[1];
    }
  }

  // Ensure locale is supported
  const supported = SUPPORTED_LANGUAGES.map((l) => l.code);
  if (!supported.includes(locale)) {
    locale = DEFAULT_LANGUAGE;
  }

  let messages = {};
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}`);
    messages = (await import(`../../messages/en.json`)).default;
  }

  return {
    locale,
    messages
  };
});
