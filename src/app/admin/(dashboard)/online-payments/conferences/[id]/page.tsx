import ConferenceForm from "../components/ConferenceForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditConferencePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  if (isNaN(id)) {
    notFound();
  }

  const [conference, categories] = await Promise.all([
    prisma.onlineConference.findUnique({
      where: { id }
    }),
    prisma.onlinePaymentCategory.findMany({
      where: { status: 'Active' },
      orderBy: { sortOrder: 'asc' }
    })
  ]);

  if (!conference) {
    notFound();
  }

  return (
    <ConferenceForm 
      conferenceId={id} 
      initialData={JSON.parse(JSON.stringify(conference))} 
      categories={categories} 
    />
  );
}