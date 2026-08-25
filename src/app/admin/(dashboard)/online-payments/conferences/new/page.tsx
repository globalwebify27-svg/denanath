import ConferenceForm from "../components/ConferenceForm";
import { prisma } from "@/lib/prisma";

export default async function NewConferencePage() {
  const categories = await prisma.onlinePaymentCategory.findMany({
    where: { status: 'Active' },
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <ConferenceForm categories={categories} />
  );
}
