import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const googtrans = cookieStore.get('googtrans')?.value;
  
  let locale = 'en';
  if (googtrans) {
    // format is typically /en/hi
    const match = googtrans.match(/\/en\/([a-z]{2,3})/);
    if (match && match[1]) {
      locale = match[1];
    }
  }

  // Ensure locale is supported
  const supported = ['en', 'hi', 'mr', 'gu', 'kn', 'ta', 'ar', 'de'];
  if (!supported.includes(locale)) {
    locale = 'en';
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
