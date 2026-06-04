import { prisma } from "@/lib/prisma";
import ForeignContributionClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function ForeignContributionPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_foreign_contribution' } });

  let fcraData: any[] = [];
  try { 
    if (setting) {
      fcraData = JSON.parse(setting.value);
    } else {
      // Fallback data (recent quarters)
      fcraData = [
        {
            "quarter": "Quarter: 4 - FY 2025-26 (Period: 01/01/2026 to 31/03/2026)",
            "donations": [
                {
                    "name": "Arati V.Rao, 818, Los Roble Ave, Palo Alto CA 94306 USA",
                    "inr": "10,08,477/-",
                    "date": "21/01/2026",
                    "purpose": "Medical"
                },
                {
                    "name": "Antha Prerna Foundation, 4229, W Slauson Ave Apt 4, Los Angeles, CA 90043-2834",
                    "inr": "45,07,000/-",
                    "date": "12/02/2026",
                    "purpose": "Social"
                }
            ],
            "emptyMessage": ""
        },
        {
            "quarter": "Quarter: 3 - FY 2025-26 (Period: 01/10/2025 to 31/12/2025)",
            "donations": [],
            "emptyMessage": "Donations not received during Quarter 3 - FY 2025-26."
        },
        {
            "quarter": "Quarter: 2 - FY 2025-26 (Period: 01/07/2025 to 30/09/2025)",
            "donations": [
                {
                    "name": "Vijay WamanTambwekar , 3442 Palm Lake Dr, Little ELM, TX 75068 USA",
                    "inr": "1,00,001/-",
                    "date": "06/08/2025",
                    "purpose": "Medical"
                }
            ],
            "emptyMessage": ""
        }
      ];
    }
  } catch (e) {}

  return <ForeignContributionClientPage fcraData={fcraData} />;
}
