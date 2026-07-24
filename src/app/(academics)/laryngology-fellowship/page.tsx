import type { Metadata } from "next";
import LaryngologyFellowshipClientPage from "./client-page";

export const metadata: Metadata = {
  title: "Laryngology Fellowship | Academics",
  description: "Laryngology Fellowship at Deenanath Mangeshkar Hospital",
};

export default function LaryngologyFellowshipPage() {
  return <LaryngologyFellowshipClientPage />;
}
