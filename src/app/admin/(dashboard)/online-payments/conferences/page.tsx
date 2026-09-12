import ConferencesClientPage from "./client-page";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ConferencesPage() {
  const conferences = await prisma.onlineConference.findMany({
    orderBy: { sort: 'asc' },
    include: { category: true }
  });
  const safeConferences = JSON.parse(JSON.stringify(conferences));

  return <ConferencesClientPage initialConferences={safeConferences} />;
}
