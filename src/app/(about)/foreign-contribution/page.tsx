"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ForeignContributionPage() {
  const aboutOptions = [
    { name: "About Hospital", href: "/about-hospital", active: false },
    { name: "Associates", href: "/associates", active: false },
    { name: "Accreditations", href: "/accreditations", active: false },
    { name: "Support Hospital / Donations", href: "/supportHospitalDonations", active: false },
    { name: "Unique features of DMH", href: "/unique-features", active: false },
    { name: "Foreign Contribution", href: "/foreign-contribution", active: true },
    { name: "Charity Details", href: "/charity-details", active: false },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on mobile/tablet (horizontal scroll)
    if (window.innerWidth < 1024 && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollContainerRef.current;
        // Calculate scroll position to center the active element
        const scrollPos = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        
        // Use setTimeout to ensure DOM is fully painted before scrolling
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const fcraData = [
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
            },
            {
                "name": "Antha Prerna Foundation, 4229, W Slauson Ave Apt 4, Los Angeles, CA 90043-2834",
                "inr": "4,49,350/-",
                "date": "16/02/2026",
                "purpose": "Social"
            },
            {
                "name": "Darshana Manoj Naik, 4/5, Indira Height, 103/2A, Erandwane, Pune 411 038",
                "inr": "50,000/-",
                "date": "02/03/2026",
                "purpose": "Medial"
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
            },
            {
                "name": "International Pediatric Airway Foundation(INPAF), Rue du Bugnon 46, 1011 Lausanne, Switzerland",
                "inr": "2,13,220/-",
                "date": "27/08/2025",
                "purpose": "Social"
            },
            {
                "name": "Antha Prerna Foundation, 4229, W Slauson Ave Apt 4, Los Angeles, CA 90043-2834",
                "inr": "8,72,535.40/-",
                "date": "17/09/2025",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 1 - FY 2025-26 (Period: 01/04/2025 to 30/06/2025)",
        "donations": [
            {
                "name": "Maharashtra Foundation, INC, PO Box No 2287,Church Street station, New York, NY 10008-2287",
                "inr": "7,95,842/-",
                "date": "21/04/2025",
                "purpose": "Social"
            },
            {
                "name": "Mahesh Shivanand Desai , 2, Cypress Valley Court, Sugar Land, Texas 77479, USA",
                "inr": "10,00,00,000/-",
                "date": "21/11/2022",
                "purpose": "Medical"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 4 - FY 2024-25 (Period: 01/01/2025 to 31/03/2025)",
        "donations": [
            {
                "name": "Maharashtra Foundation, INC, PO Box No 2287,Church Street station, New York, NY 10008-2287",
                "inr": "3,17,672/-",
                "date": "06/01/2025",
                "purpose": "Social"
            },
            {
                "name": "Reyjie Gaerlan Cruz, C-15, Kalpatary Jade Residences, PAN Card Club Road, Baner, Pune 411 045",
                "inr": "10,000/-",
                "date": "14/01/2025",
                "purpose": "Social"
            },
            {
                "name": "Direct Relief, 6100 Wallace Becknell Road, Santa Barbara, CA 93117",
                "inr": "68,94,031/-",
                "date": "03/02/2025",
                "purpose": "Medical"
            },
            {
                "name": "Arati V.Rao, 818, Los Roble Ave, Palo Alto CA 94306 USA",
                "inr": "10,76,101/-",
                "date": "12/02/2025",
                "purpose": "Medial"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 3 - FY 2024-25 (Period: 01/10/2024 to 31/12/2024)",
        "donations": [
            {
                "name": "Direct Relief ,6100 Wallace Becknell Road, Santa Barbara, CA 93117",
                "inr": "1,33,46,616/-",
                "date": "14/11/2024",
                "purpose": "Social"
            },
            {
                "name": "Seema Vijay Bapat, 13,14,Z4 Himali Housing Society Erandwane, Pune 411004",
                "inr": "1,00,000/-",
                "date": "28/11/2024",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 2 - FY 2024-25 (Period: 01/07/2024 to 30/09/2024)",
        "donations": [
            {
                "name": "Direct Relief ,6100 Wallace Becknell Road, Santa Barbara, CA 93117",
                "inr": "3,33,36,000/-",
                "date": "23/07/2024",
                "purpose": "Medical"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 1 - FY 2024-25 (Period: 01/04/2024 to 30/06/2024) -",
        "donations": [
            {
                "name": "Maharashtra Foundation, INC, PO Box No 2287,Church Street station, New York, NY 10008-2287",
                "inr": "8,21,923/-",
                "date": "07/05/2024",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 4 - FY 2023-24 (Period: 01/01/2024 to 31/03/2024) -",
        "donations": [
            {
                "name": "Achyut Gangadhar Honkan, 32,Snowden Court, Brampton On, L6Y3M2, Canada",
                "inr": "50,000/-",
                "date": "18/01/2024",
                "purpose": "Social"
            },
            {
                "name": "Direct Relief, 6100 Wallace Becknell Road, Santa Barbara, CA 93117",
                "inr": "2,89,90,500/-",
                "date": "18/01/2024",
                "purpose": "Medical"
            },
            {
                "name": "Neeta Mahesh Desai, 2, Cypress Valley Court, Sugarland, Texas 77479 , USA",
                "inr": "35,00,000/-",
                "date": "01/03/2024",
                "purpose": "Social"
            },
            {
                "name": "Inoxpa India Pvt.Ltd., Shed No.01,03 to 08,10 to 12, Sr.No.83, Hissa No.2/6/A, Anant Industrial Estate, Shivane Haveli, Pune 411 023",
                "inr": "19,41,356/-",
                "date": "19/03/2024",
                "purpose": "Medical"
            },
            {
                "name": "Direct Relief, 6100 Wallace Becknell Road, Santa Barbara, CA 93117",
                "inr": "2,47,87,868/-",
                "date": "19/03/2024",
                "purpose": "Medical"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 3 - FY 2023-24 (Period: 01/10/2023 to 31/12/2023) -",
        "donations": [
            {
                "name": "Seema Vijay Bapat, 13,14, Z4, Himali Society, Erandwane, Pune 411 004",
                "inr": "1,00,000/-",
                "date": "23/11/2023",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 2 - FY 2023-24 (Period: 01/07/2023 to 30/09/2023) -",
        "donations": [
            {
                "name": "Direct Relief, 6100 Wallace Becknell Road, Santa Barbara, CA 93117",
                "inr": "6,10,72,500/-",
                "date": "25/07/2023",
                "purpose": "Medical"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 1 - FY 2023-24 (Period: 01/04/2023 to 30/06/2023) -",
        "donations": [],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 4 - FY 2022-23 (Period: 01/01/2023 to 31/03/2023) -",
        "donations": [
            {
                "name": "Ramdas D Kenjale, 4380, Sunflower Way, San Luis Obispo, CA 93401",
                "inr": "4,04,388/-",
                "date": "11/01/2023",
                "purpose": "Social"
            },
            {
                "name": "Fabian D’Souza, 4 Wellington Street, Boston, MA 02118, USA",
                "inr": "8,500/-",
                "date": "16/02/2023",
                "purpose": "Medical"
            },
            {
                "name": "Maharashtra Foundation, INC, PO Box No 2287,Church Street station, New York, NY 10008-2287",
                "inr": "7,94,200/-",
                "date": "08/03/2023",
                "purpose": "Social"
            },
            {
                "name": "ACSV International Pte Ltd., Oxley Bizhub 2, 62 UBI Road 1, # 11-08, Postal 408734",
                "inr": "1,59,098/-",
                "date": "10/03/2023",
                "purpose": "Medical"
            },
            {
                "name": "Mahesh Shivanand Desai , 2, Cypress Valley Court, Sugar Land, Texas 77479, USA",
                "inr": "13,000/-",
                "date": "31/03/2023",
                "purpose": "Medical"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 3 - FY 2022-23 (Period: 01/10/2022 to 31/12/2022) -",
        "donations": [
            {
                "name": "Saurabh Pradeep Londhe, HAns-Sommer, Strasse 78, 38106, Braunschweig, Germany",
                "inr": "10,000/-",
                "date": "09/10/2022",
                "purpose": "Social"
            },
            {
                "name": "Vengurlekar Uma, 306,Revati enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "50,000/-",
                "date": "21/11/2022",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 2 - FY 2022-23 (Period: 01/07/2022 to 30/09/2022) -",
        "donations": [],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 1 - FY 2022-23 (Period: 01/04/2022 to 30/06/2022) -",
        "donations": [
            {
                "name": "Bhat Ajit Keshav, 425, Lakehill Court, Johns Creek, CA 30022, USA",
                "inr": "5,00,000/-",
                "date": "25/05/2022",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 4 - FY 2021-22 (Period: 01/01/2022 to 31/03/2022) -",
        "donations": [],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 3 - FY 2021-22 (Period: 01/10/2021 to 31/12/2021) -",
        "donations": [
            {
                "name": "Jayashree Mahajan (in memory of Dr.Pushpa Agashe), 1126 NW 23rd Terrace Gainesville, FL 32605, USA",
                "inr": "42,00,000/-",
                "date": "05/10/2021",
                "purpose": "Social"
            },
            {
                "name": "Vengurlekar Uma, 306,Revati enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "50,000/-",
                "date": "04/10/2021",
                "purpose": "Social"
            },
            {
                "name": "Direct Releif International, 6100 Wallance Becknell Road, Santa Barbara, California, CA 93117",
                "inr": "3,71,32,401/-",
                "date": "11/11/2021",
                "purpose": "Medical"
            },
            {
                "name": "Milaap Social Ventures Pvt.Ltd., Clay Works Create, 11th KM Create Campus, Arakere Bannerghatta Rd., Arekere, Bengaluru, Karnataka 560076",
                "inr": "1,52,149/-",
                "date": "27/12/2021",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 2 - FY 2021-22 (Period: 01/07/2021 to 30/09/2021) -",
        "donations": [
            {
                "name": "Patkar Parag, 4117, Park Blvd, Palo Alto, CA 94306",
                "inr": "75,594/-",
                "date": "13/07/2021",
                "purpose": "Social"
            },
            {
                "name": "Wadhwani Rita, 6568, Beachview Dr.APT, #113, Rncho PLS VRD,RPV, CA 90275 USA",
                "inr": "89,364/-",
                "date": "26/07/2021",
                "purpose": "Social"
            },
            {
                "name": "Maharashtra Foundation, PO Box No.2287, Church Street Station, New York, NY",
                "inr": "6,87,524.50/-",
                "date": "30/07/2021",
                "purpose": "Social"
            },
            {
                "name": "Keshav Rajgoapalan, 127, Greene St floor 3, New York, NY 10012",
                "inr": "36,685/-",
                "date": "07/08/2021",
                "purpose": "Social"
            },
            {
                "name": "T-Systems ICT India Pvt.Ltd., Panchshil Buisness Park, Tower A, C.S.No.20, Balewadi High Street, Baner, Pune 411 045",
                "inr": "15,00,000/-",
                "date": "27/09/2021",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 1 - FY 2021-22 (Period: 01/04/2021 to 30/06/2021) -",
        "donations": [
            {
                "name": "Joglekar Mangala Umesh, Plot No..11, Unit 4, Gananjay Society, Kothrud, Pune 411 038",
                "inr": "25,000/-",
                "date": "23/04/2021",
                "purpose": "Medical"
            },
            {
                "name": "Avegen India Pvt.Ltd., Row House No.30, Rolling Hills Apt., S.No. 05/2/1, Baner, Pune 411 045",
                "inr": "4,48,000/-",
                "date": "07/05/2021",
                "purpose": "Social"
            },
            {
                "name": "Paradigm Works India Pvt.Ltd., B-503, Valencia, Hiranandani, Powai, Mumbai 400 076",
                "inr": "5,00,000/-",
                "date": "14/05/2021",
                "purpose": "Social"
            },
            {
                "name": "Vaidya Vinay Govind, 108,Prathamesh Park, Balewadi Road, Pune 411 045",
                "inr": "51,000/-",
                "date": "11/05/2021",
                "purpose": "Social"
            },
            {
                "name": "Lele Prashant, 105 Hill Road, PINNER MIDDLESEX HAS ILD UK",
                "inr": "25.000/-",
                "date": "26/05/2021",
                "purpose": "Social"
            },
            {
                "name": "Kotwal Chetan, B 1002 , Waterfront Apt., Kalyanianagar, Pune 411 006",
                "inr": "10,00,000/-",
                "date": "01/06/2021",
                "purpose": "Social"
            },
            {
                "name": "T-Systems ICT India Pvt.Ltd., Panchshil Buisness Park, Tower A, C.S.No.20, Balewadi High Street, Baner, Pune 411 045",
                "inr": "35,00,000/-",
                "date": "01/06/2021",
                "purpose": "Social"
            },
            {
                "name": "Wagholikar Sarang Shrikrishna, 1386, Lewiston Drive, Sunnyvale CA 94087 (USA)",
                "inr": "1,00,001/-",
                "date": "01/06/2021",
                "purpose": "Social"
            },
            {
                "name": "Mittal Yashswini Deval, 2200 East Camino La Zorella, Tucson, AZ 58718",
                "inr": "1,00,000/-",
                "date": "10/06/2021",
                "purpose": "Social"
            },
            {
                "name": "Net Shape Engineering Services Pvt.Ltd., Office No.401-404, Rachana Ventura, Off ITI road, Aundh, Pune 411 007",
                "inr": "5,00,000/-",
                "date": "10/06/2021",
                "purpose": "Social"
            },
            {
                "name": "Saraswat Foundation, 178, Norman Drive, Morrisville, PA 19067",
                "inr": "7,32,688/-",
                "date": "22/06/2021",
                "purpose": "Social"
            },
            {
                "name": "Shashikant Subramanian, Unit No.1, Georges Court, 131 Putney Bridge Road, London, SW 152 PA, UK",
                "inr": "15,230/-",
                "date": "22/06/2021",
                "purpose": "Social"
            },
            {
                "name": "Direct Releif International, 6100 Wallance Becknell Road, Santa Barbara, California, CA 93117",
                "inr": "1,48,12,407/-",
                "date": "22/06/2021",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 4 - FY 2020-21 (Period: 01/01/2021 to 31/03/2021) -",
        "donations": [
            {
                "name": "Vengurlekar Uma, 306,Revati enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "50,000/-",
                "date": "20/01/2021",
                "purpose": "Social"
            },
            {
                "name": "Direct Relief ,27S,La Patera Ln, Goleta, Santa Barbara, CA 93117",
                "inr": "1,08,36,471/-",
                "date": "24/02/2021",
                "purpose": "Social"
            },
            {
                "name": "Agashe Pushpa P, 254, Central Avenue, RIO GRANDE, OHIO 45674",
                "inr": "5,00,000/-",
                "date": "12/03/2021",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 3 - FY 2020-21 (Period: 01/10/2020 to 31/12/2020) -",
        "donations": [
            {
                "name": "Karmodaya, USA, 700 E Redlands Blvd, Suite U622, Realands, CA,92374",
                "inr": "42,000/-",
                "date": "31/10/2020",
                "purpose": "Social"
            },
            {
                "name": "Karmodaya, USA, 700 E Redlands Blvd, Suite U622, Realands, CA,92374",
                "inr": "28,000/-",
                "date": "31/10/2020",
                "purpose": "Social"
            },
            {
                "name": "Karmodaya, USA,700 E Redlands Blvd, Suite U622, Realands, CA, 92374",
                "inr": "1,15,500/-",
                "date": "31/10/2020",
                "purpose": "Social"
            },
            {
                "name": "Vengurlekar Uma, 306,Revati enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "60,000/-",
                "date": "25/11/2020",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 2 - FY 2020-21 (Period: 01/07/2020 to 30/09/2020) -",
        "donations": [
            {
                "name": "Mohan Kumar Sharma, 7, Southfield Drive, Hazlemere, High Wycombe, HP157HB, UK",
                "inr": "50,000/-",
                "date": "03/07/2020",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 1 - FY 2020-21 (Period: 01/04/2020 to 30/06/2020) -",
        "donations": [
            {
                "name": "Direct Relief ,6100 Wallace Becknell Road, Santa Barbara, CA 93117",
                "inr": "12,37,122/-",
                "date": "12/05/2020",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 4 - FY 2019-20 (Period: 01/01/2020 to 31/03/2020) -",
        "donations": [
            {
                "name": "Novus Global Solutions LLC,197 Route 18 S, Suite 3000, East Brunswick. New Jersey USA 08816",
                "inr": "6503.77/-",
                "date": "02/01/2020",
                "purpose": "Medical"
            },
            {
                "name": "Vengurlekar Uma, 306,Revati enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "10,000/-",
                "date": "04/01/2020",
                "purpose": "Social"
            },
            {
                "name": "Novus Global Solutions LLC,197 Route 18 S, Suite 3000, East Brunswick. New Jersey USA 08816",
                "inr": "28,46,277/-",
                "date": "09/01/2020",
                "purpose": "Medical"
            },
            {
                "name": "Novus Global Solutions LLP, Plot 40/1/A, Usha Clinic, Karve Road, Pune 411 004",
                "inr": "1,47,220/-",
                "date": "09/01/2020",
                "purpose": "Medical"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 3 - FY 2019-20 (Period: 01/10/2019 to 31/12/2019) -",
        "donations": [
            {
                "name": "Vengurlekar Uma, 306,Revati enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "54,000/-",
                "date": "04/10/2019",
                "purpose": "Social"
            },
            {
                "name": "Desai Jagdish, 5930, Startford Gardens Dr , Sugar Land, Texas- 77479-000",
                "inr": "1,25,000/-",
                "date": "16/10/2019",
                "purpose": "Social"
            },
            {
                "name": "Vengurlekar Uma, 306,Revati enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "50,000/-",
                "date": "14/11/2019",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 2 - FY 2019-20 (Period: 01/07/2019 to 30/09/2019) -",
        "donations": [
            {
                "name": "Maharashtra Foudation, PO Box No 2287,Church Street station, New York, NY 10008-2287",
                "inr": "63,938/-",
                "date": "03/07/2019",
                "purpose": "Social"
            },
            {
                "name": "Uday Devaskar, UCLA Scholl of Medicin, Los Agneless, CA-90095",
                "inr": "7,00,000/-",
                "date": "18/09/2019",
                "purpose": "Medical"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 1 - FY 2019-20 (Period: 01/04/2019 to 30/06/2019) -",
        "donations": [
            {
                "name": "Desai Mahesh Shivanand, 2, Cypress Valley Court, Sugar Land, Texas 77479, USA",
                "inr": "5,00,000/-",
                "date": "22/04/2019",
                "purpose": "Social"
            },
            {
                "name": "Desai Mahesh Shivanand, 2, Cypress Valley Court, Sugar Land, Texas 77479, USA",
                "inr": "15,00,000/-",
                "date": "22/04/2019",
                "purpose": "Medical"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 4 - FY 2018-19 (Period: 01/01/2019 to 31/03/2019) -",
        "donations": [
            {
                "name": "Vengurlekar Uma, 306,Revati Enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "60,000/-",
                "date": "14/01/2019",
                "purpose": "Social"
            },
            {
                "name": "Dr.Devaskar Uday,UCLA Scholl of Medicin, Los Angeles, CA 90095",
                "inr": "20,00,000/-",
                "date": "06/02/2019",
                "purpose": "Medical"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 3 - FY 2018-19 (Period: 01/10/2018 to 31/12/2018) -",
        "donations": [],
        "emptyMessage": "Donations not received during Quarter 2 - FY 2018-19"
    },
    {
        "quarter": "Quarter: 2 - FY 2018-19 (Period: 01/07/2018 to 30/09/2018) -",
        "donations": [
            {
                "name": "Agashe Pushpa P, 254, Central Avenue, RIO GRANDE, OHIO 45674",
                "inr": "2,00,000/-",
                "date": "30/07/2018",
                "purpose": "Social"
            },
            {
                "name": "Vengurlekar Uma, 306,Revati Enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "50,000/-",
                "date": "11/09/2018",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 1 - FY 2018-19 (Period: 01/04/2018 to 30/06/2018) -",
        "donations": [
            {
                "name": "De Silva Harendra,47, Hartswood Road, London NIZ9 NE, UK",
                "inr": "1,00,000/-",
                "date": "19/04/2018",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 4 - FY 2017-18 (Period: 01/01/2018 to 31/03/2018) -",
        "donations": [
            {
                "name": "Vengurlekar Uma, 306,Revati enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "10,000/-",
                "date": "30/01/2018",
                "purpose": "Social"
            },
            {
                "name": "Dr.Devaskar Uday,727, Malcolm Avenue, Los Angeles, CA 90024 , USA",
                "inr": "38,23,349/-",
                "date": "16/02/2018",
                "purpose": "Medical"
            },
            {
                "name": "Vengurlekar Uma, 306,Revati enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "50,000/-",
                "date": "16/03/2018",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 3 - FY 2017-18 (Period: 01/10/2017 to 31/12/2017) -",
        "donations": [
            {
                "name": "Oswal Nirmala Vasant, Far Shirby, Upleatham, Redcar, TS11 8 AG, UK.",
                "inr": "5,00,000/-",
                "date": "05/10/2017",
                "purpose": "Social"
            },
            {
                "name": "Vengurlekar Uma, 306,Revati enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "50,000/-",
                "date": "08/11/2017",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 2 - FY 2017-18 (Period: 01/07/2017 to 30/09/2017) -",
        "donations": [],
        "emptyMessage": "Donations not received during Quarter 2 - FY 2017-18"
    },
    {
        "quarter": "Quarter: 1 - FY 2017-18 (Period: 01/04/2017 to 30/06/2017) -",
        "donations": [
            {
                "name": "Agashe Pushpa P, 254, Central Avenue, RIO GRANDE, OHIO 45674",
                "inr": "2,00,000/-",
                "date": "11/04/2017",
                "purpose": "Social"
            },
            {
                "name": "Maharashtra Foundation, INC, PO Box No 2287,Church Street station, New York, NY",
                "inr": "1,57,704/-",
                "date": "08/05/2017",
                "purpose": "Medical"
            },
            {
                "name": "Oswal Nirmala Vasant, Far Shirby, Upleatham, Redcar, TS11 8 AG, UK.",
                "inr": "10,00,000",
                "date": "07/06/2017",
                "purpose": "Medical"
            },
            {
                "name": "Direct Releif, 27S,La Patera Ln, Goleta, Santa Barbara, CA - 93117",
                "inr": "3,29,300/-",
                "date": "30/06/2017",
                "purpose": "Medical"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 4 - FY 2016-17 (Period: 01/01/2017 to 31/03/2017) -",
        "donations": [
            {
                "name": "Oswal Nirmala Vasant, Far Shirby, Upleatham, Redcar, TS11 8 AG, UK.",
                "inr": "35,00,000/-",
                "date": "01/03/2017",
                "purpose": "Social"
            },
            {
                "name": "European Marathi Sammelan, C/O Rahul Bhalinge, 4 Tudor Lodge Road, GL5025N, UK",
                "inr": "1,17,005.41/-",
                "date": "10/03/2017",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 3 - FY 2016-17 (Period: 01/10/2016 to 31/12/2016) -",
        "donations": [
            {
                "name": "Indiegogo, 965 Mission, St.Fl 7, San Francisco, CA 94103,USA",
                "inr": "1,49,455/-",
                "date": "06/12/2016",
                "purpose": "Social"
            },
            {
                "name": "Dr.Divekar Bhalchandra Laxman , 16,Cannon Woods Way, Ashford, Kent U.K., TN 24 9 QY",
                "inr": "40,000/-",
                "date": "18/10/2016",
                "purpose": "Social"
            },
            {
                "name": "Desai Neeta Mahesh, USA",
                "inr": "2,00,000/-",
                "date": "29/12/2016",
                "purpose": "Social"
            },
            {
                "name": "Desai Durga Shivanand, 2, Cypress Valley Court, Sugar Land, Texas 77479, USA",
                "inr": "10,00,000/-",
                "date": "30/12/2016",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 2 - FY 2016-17 (Period: 01/07/2016 to 30/09/2016) -",
        "donations": [
            {
                "name": "Joshi Shrikant V, 537, LeFevre Dr.Folsom CA-95630",
                "inr": "78,000/-",
                "date": "20/07/2016",
                "purpose": "Social"
            },
            {
                "name": "Vengurlekar Uma, 306,Revati enclave, Bhujbal Baug, Karvenagar, Pune 411 052",
                "inr": "50,000/-",
                "date": "19/07/2016",
                "purpose": "Social"
            },
            {
                "name": "WU Buisness Solutions (USA), LLC, 1152 15th Street, NW Washington, DC 20005",
                "inr": "6,44,625/-",
                "date": "23/08/2016",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    },
    {
        "quarter": "Quarter: 1 - FY 2016-17 (Period: 01/04/2016 to 30/06/2016) -",
        "donations": [
            {
                "name": "Oswal Nirmala Vasant, Far Shirby, Upleatham, Redcar, TS11 8 AG, UK.",
                "inr": "5,00,000/-",
                "date": "06/05/2016",
                "purpose": "Social"
            },
            {
                "name": "Maharashtra Foundation, PO Box No 2287,Church Street station, New York, NY 10008-2287",
                "inr": "1,64,359/-",
                "date": "09/05/2016",
                "purpose": "Social"
            }
        ],
        "emptyMessage": ""
    }
];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/about-hospital" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Foreign Contribution</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Foreign Contribution</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
            <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {aboutOptions.map((option, idx) => (
                <Link
                  key={idx}
                  href={option.href}
                  data-active={option.active}
                  className={`snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal ${
                    option.active
                      ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                      : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                  } ${idx !== aboutOptions.length - 1 ? "lg:border-b lg:border-b-slate-50" : ""}`}
                >
                  <span>{option.name}</span>
                  <ChevronRight 
                    className={`hidden lg:block w-4 h-4 transition-transform duration-300 ${
                      option.active 
                        ? "text-[#007a87] translate-x-1" 
                        : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#002b5c]"
                    }`} 
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-12">
              
              {/* Introduction Text */}
              <div className="mb-10 text-slate-600 leading-relaxed text-[15px] space-y-4">
                <p>
                  Lata Mangeshkar Medical Foundation (LMMF) is registered under FCRA Act 1976, having registration No. 083930335 valid till 31/12/2026.
                </p>
                <p>
                  The organization is a trust registered under Bombay Public trust act 1950.
                </p>
                <p>
                  As per provisions of the act the trust is allowed to receive donation from foreign source as defined u/s 2(1) (j).
                </p>
              </div>

              {/* Quarterly Data Tables */}
              <div className="space-y-12">
                {fcraData.map((quarterData, qIdx) => (
                  <div key={qIdx} className="w-full">
                    {/* Quarter Title */}
                    <h3 className="text-base font-bold text-slate-800 mb-4">{quarterData.quarter}</h3>
                    
                    {/* Empty State vs Table */}
                    {quarterData.donations.length === 0 ? (
                      <p className="text-slate-500 text-[14px]">{quarterData.emptyMessage}</p>
                    ) : (
                      <div className="w-full overflow-x-auto border border-slate-200 rounded-lg custom-scrollbar">
                        <table className="w-full min-w-[800px] text-left border-collapse">
                          <thead>
                            <tr className="bg-[#1eb7a6] text-white">
                              <th className="py-3 px-4 font-semibold text-[13px] tracking-wide border-r border-white/20">Name and Full Address of the FC Donor</th>
                              <th className="py-3 px-4 font-semibold text-[13px] tracking-wide border-r border-white/20 whitespace-nowrap w-[150px] text-right">Equivalent INR</th>
                              <th className="py-3 px-4 font-semibold text-[13px] tracking-wide border-r border-white/20 whitespace-nowrap w-[130px] text-center">Date of Receipt</th>
                              <th className="py-3 px-4 font-semibold text-[13px] tracking-wide w-[100px]">Purpose</th>
                            </tr>
                          </thead>
                          <tbody>
                            {quarterData.donations.map((donor, dIdx) => (
                              <tr key={dIdx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
                                <td className="py-3 px-4 text-[13px] text-slate-600 border-r border-slate-100">{donor.name}</td>
                                <td className="py-3 px-4 text-[13px] text-slate-600 border-r border-slate-100 text-right whitespace-nowrap">{donor.inr}</td>
                                <td className="py-3 px-4 text-[13px] text-slate-600 border-r border-slate-100 text-center whitespace-nowrap">{donor.date}</td>
                                <td className="py-3 px-4 text-[13px] text-slate-600 whitespace-nowrap">{donor.purpose}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* Scrollbar styles for tables */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}} />
    </div>
  );
}
