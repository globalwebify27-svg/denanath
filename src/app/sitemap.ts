import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const routes = [
    '',
    '/about',
    '/contact-us',
    '/doctors',
    '/departments',
    '/patient-guide',
    '/research',
    '/academics',
    '/events',
    '/careers',
    '/patient-visitors'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes]
}
