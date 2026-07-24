import type { Metadata } from "next";
import VasantNirmalaOswalCentreClientPage from "./client-page";

export const metadata: Metadata = {
  title: "Vasant & Nirmala Oswal Centre | Academics",
  description: "Vasant & Nirmala Oswal Centre For Post Graduate Training & Education at Deenanath Mangeshkar Hospital",
};

export default function VasantNirmalaOswalCentrePage() {
  return <VasantNirmalaOswalCentreClientPage />;
}
