import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const page = await prisma.dynamicPage.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error fetching dynamic page:', error);
    return NextResponse.json({ error: 'Failed to fetch dynamic page' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const data = await request.json();
    const { title, slug, navbarMenu, content, status, seoMetaTitle, seoMetaDescription, seoKeywords, gallery } = data;

    if (!title || !slug || !content || !navbarMenu) {
      return NextResponse.json({ error: 'Title, slug, navbarMenu, and content are required' }, { status: 400 });
    }

    // Check if slug exists for other pages
    const existing = await prisma.dynamicPage.findFirst({
      where: { 
        slug,
        id: { not: resolvedParams.id }
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    const updatedPage = await prisma.dynamicPage.update({
      where: { id: resolvedParams.id },
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
    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error('Error updating dynamic page:', error);
    return NextResponse.json({ error: 'Failed to update dynamic page' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await prisma.dynamicPage.delete({
      where: { id: resolvedParams.id },
    });
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting dynamic page:', error);
    return NextResponse.json({ error: 'Failed to delete dynamic page' }, { status: 500 });
  }
}
