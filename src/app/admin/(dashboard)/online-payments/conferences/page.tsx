import ConferencesClientPage from "./client-page";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ConferencesPage() {
  const conferences = await prisma.onlineConference.findMany({
    orderBy: { sort: 'asc' },
    include: { category: true }
  });

  return <ConferencesClientPage initialConferences={conferences} />;
}
