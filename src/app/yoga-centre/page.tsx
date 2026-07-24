import type { Metadata } from "next";
import YogaCentreClientPage from "./client-page";

export const metadata: Metadata = {
  title: "Yoga Centre",
  description: "Yoga Classes Schedule at Deenanath Mangeshkar Hospital",
};

export default function YogaCentrePage() {
  return <YogaCentreClientPage />;
}
