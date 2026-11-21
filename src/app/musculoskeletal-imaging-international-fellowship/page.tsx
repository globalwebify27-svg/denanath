import type { Metadata } from "next";
import InternationalFellowshipClientPage from "./client-page";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Musculoskeletal Imaging - International Fellowship - Deenanath Mangeshkar Hospital",
    description: "6-Month Advanced Cross-Sectional MSK Observership & Fellowship for Visiting International Radiologists at Deenanath Mangeshkar Hospital & Research Center, Pune.",
    keywords: "musculoskeletal imaging international fellowship, msk fellowship pune, dmh radiology fellowship, dr sanjay desai radiology, international radiology observership india",
  };
}

export default function InternationalFellowshipPage() {
  return <InternationalFellowshipClientPage />;
}
