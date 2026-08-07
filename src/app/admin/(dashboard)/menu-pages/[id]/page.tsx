import PageForm from "../client-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditMenuPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const page = await prisma.dynamicPage.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!page) {
    notFound();
  }

  return <PageForm pageId={resolvedParams.id} initialData={page} />;
}
