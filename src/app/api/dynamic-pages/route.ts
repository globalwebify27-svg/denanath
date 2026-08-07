import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const pages = await prisma.dynamicPage.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        navbarMenu: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching dynamic pages:', error);
    return NextResponse.json({ error: 'Failed to fetch dynamic pages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, slug, navbarMenu, content, status, seoMetaTitle, seoMetaDescription, seoKeywords, gallery } = data;

    if (!title || !slug || !content || !navbarMenu) {
      return NextResponse.json({ error: 'Title, slug, navbarMenu, and content are required' }, { status: 400 });
    }

    // Check if slug exists
    const existing = await prisma.dynamicPage.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    const newPage = await prisma.dynamicPage.create({
      data: {
        title,
        slug,
        navbarMenu,
        content,
        status: status ?? true,
        seoMetaTitle,
        seoMetaDescription,
        seoKeywords,
        gallery,
      },
    });

    revalidatePath('/', 'layout');
    return NextResponse.json(newPage, { status: 201 });
  } catch (error) {
    console.error('Error creating dynamic page:', error);
    return NextResponse.json({ error: 'Failed to create dynamic page' }, { status: 500 });
  }
}
