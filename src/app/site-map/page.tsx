import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import SiteMapClient from './SiteMapClient';

export const dynamic = 'force-dynamic';

export default async function SiteMapPage() {
  let dynamicPages: { title: string; slug: string; navbarMenu: string }[] = [];
  try {
    const pages = await prisma.dynamicPage.findMany({
      where: { status: true },
      select: { title: true, slug: true, navbarMenu: true },
      orderBy: { navbarMenu: 'asc' },
    });
    dynamicPages = pages;
  } catch (e) {
    console.error('SiteMap: failed to fetch dynamic pages', e);
  }

  return <SiteMapClient dynamicPages={dynamicPages} />;
}
