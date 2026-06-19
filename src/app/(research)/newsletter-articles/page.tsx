import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function NewsletterArticlesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_newsletter_articles' } });
  let pageData: any = { title: "Newsletter Articles", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
