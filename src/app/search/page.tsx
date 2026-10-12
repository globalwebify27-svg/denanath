import type { Metadata } from "next";
import { performGlobalSearch } from "@/lib/searchEngine";
import SearchResultsClient from "./SearchResultsClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const q = params?.q?.trim();

  return {
    title: q ? `"${q}" - Search Results | Deenanath Mangeshkar Hospital` : "Search | Deenanath Mangeshkar Hospital",
    description: "Search across doctors, departments, simulation center, academics, research, and services at Deenanath Mangeshkar Hospital Pune.",
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q || "";

  const results = await performGlobalSearch(query);

  return <SearchResultsClient initialResults={results} />;
}
