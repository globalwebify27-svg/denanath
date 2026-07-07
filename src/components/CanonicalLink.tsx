'use client';
import { usePathname } from 'next/navigation';

export default function CanonicalLink() {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${siteUrl}${pathname}`;

  return <link rel="canonical" href={url} />;
}
