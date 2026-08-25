import CategoriesClientPage from "./client-page";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.onlinePaymentCategory.findMany({
    orderBy: { sortOrder: 'asc' }
  });

  return <CategoriesClientPage initialCategories={categories} />;
}
