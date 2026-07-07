import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import UniqueFeaturesClientPage from "./client-page";

export const dynamic = "force-dynamic";


export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_unique_features' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function UniqueFeaturesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_unique_features' } });

  let featuresData: any[] = [];
  try { 
    if (setting) {
      const parsed = JSON.parse(setting.value);
      featuresData = Array.isArray(parsed) ? parsed : (parsed.items || []);
    } else {
      // Fallback data
      featuresData = [
        {
          id: 1,
          title: "EMS",
          description: "A unique “Emergency Medical Services (EMS) Programme is launched in Pune city with International Quality Infrastructure and well-trained manpower.\n\nFeatures:",
          bullets: [
            "2 Wheeler ambulances - will reach narrow lanes of the city with EMS doctor.",
            "A fleet of 5 ambulances - with all necessary medical equipments like defibrillators, ventilators, monitors etc. and wireless communication - You can very well call it as an 'ICU-on-Wheels' to shift critical patients safely.",
            "Dial 020 40151540 - The 'Heart-Brigade and Trauma-Ambulance' will reach soon."
          ],
          iconStr: "Ambulance",
          color: "text-red-600 bg-red-50 border border-red-100"
        },
        {
          id: 2,
          title: "INTENSIVE CARE UNIT",
          description: "Sophisticated ICU setup with following features:",
          bullets: [
            "Total 100 beds for General, Cardiac, Neonatal, Pediatric, Obstetric ICUs",
            "A unique design which keeps the relatives in touch with the patients without disturbing the patient management.",
            "Continuous Patient Monitoring by Central Monitoring system",
            "Central Medical Gas Pipeline network for Oxygen, Nitrous, Air and Vacuum",
            "All types of Ventilators to assist respiration"
          ],
          iconStr: "Activity",
          color: "text-blue-600 bg-blue-50 border border-blue-100"
        },
        {
          id: 3,
          title: "OPERATION THEATRE",
          description: "10 operation theatres with laminar flow air conditioning, rigid asepsis and medical gas pipeline network.\nFully equipped with all the necessary medical equipments like C-Arm X Ray, High-tech Anesthesia machines and all surgical instruments.\nInternational standards for sterility, asepsis and hygiene.\nAll types of Endoscopic surgeries, Joint replacement surgeries, Plastic surgeries, Cancer surgeries, Cardiac surgeries and Neuro-surgeries are carried out.",
          bullets: [],
          iconStr: "Syringe",
          color: "text-teal-600 bg-teal-50 border border-teal-100"
        },
        {
          id: 4,
          title: "BLOOD BANK",
          description: "Cell Separator – The latest technique of Programmable Aphaeresis - used for preparing Single Donor Platelets required for treating cancer patients and other critical cases where platelet count drops to very low level.",
          bullets: [],
          iconStr: "Droplet",
          color: "text-rose-600 bg-rose-50 border border-rose-100"
        },
        {
          id: 5,
          title: "DIGITAL RADIOLOGY",
          description: "The Department of Radio-diagnosis consists of latest equipment like:",
          bullets: [
            "Digital X ray – The X ray with image intensifier and motorised table gives the flexibility and accuracy for correct diagnosis.",
            "Computerised Radiology System (C. R.) – All the modules of Radiology (like C T Scan, Mammography, X ray) are connected to a central Computer Server, where post processing is done on the images."
          ],
          iconStr: "Monitor",
          color: "text-indigo-600 bg-indigo-50 border border-indigo-100"
        },
        {
          id: 6,
          title: "FOREIGN COLLABORATIONS",
          description: "We are trying to get the latest knowledge from all over the world through our counterparts like....",
          bullets: [
            "Zentral Krankenhausen – A 3000 bedded hospital in Germany where our medical and paramedical staff is trained regularly.",
            "Dr. Devaskar – UCLA, USA – A renowned pediatrician visits regularly to implement the latest trends in neonatal intensive care in USA.",
            "Dr. Oswal, Middles borough, U.K. – Highly respected E.N.T. Surgeon visits to promote new techniques of Laser surgeries.",
            "Dr. Peer, Philadelphia, USA – With her massive contribution in setting up our Rehabilitation Center, continues to guide the department from her own center in USA.",
            "Dr. Balasubramaniam, USA – Trains our EMS Staff to handle any type of emergency / trauma with most scientific approach."
          ],
          iconStr: "Globe",
          color: "text-sky-600 bg-sky-50 border border-sky-100"
        },
        {
          id: 7,
          title: "CARDIAC CENTER",
          description: "One of the best infra-structure for all types of Cardio-vascular and cardio-thoracic diagnosis and treatment such as angiography, angioplasty, open-heart / beating-heart surgeries.\nThe specialties of our cardiac center are:",
          bullets: [
            "CATHLAB – We are having the best Cathlab available today from Philips, Netherlands – which can clearly monitor your blood-flow in vessels however small -up to 0.5 mm size.",
            "Operating Room which is having highest level sterility with epoxy coating and filtered air conditioning.",
            "The operation theatre is well equipped with Cardiac monitors, Heart-lung machine and all life-saving equipments.",
            "All this infrastructure supports our Cardiac Surgeons who are trained abroad - to operate the most precious organ of human body – 'Heart'."
          ],
          iconStr: "HeartPulse",
          color: "text-pink-600 bg-pink-50 border border-pink-100"
        },
        {
          id: 8,
          title: "VOICE CLINIC",
          description: "'Video Stroboscope' – is a unique technique for diagnosis of all voice disorders. Further necessary treatments are available in this clinic with all types of surgeries including LASER surgery.",
          bullets: [],
          iconStr: "Mic",
          color: "text-violet-600 bg-violet-50 border border-violet-100"
        },
        {
          id: 9,
          title: "KIDNEY TRANSPLANT",
          description: "We are having all the necessary expertise and infrastructure to carry out Kidney Transplant. We have fulfilled all the international and Indian norms to undertake such transplants.",
          bullets: [],
          iconStr: "Heart",
          color: "text-emerald-600 bg-emerald-50 border border-emerald-100"
        },
        {
          id: 10,
          title: "REHABILITATION DEPARTMENT",
          description: "The department provides comprehensive care for people with disabilities arising out of diseases like chronic back and neck pain, spinal cord injury, stroke, traumatic brain injuries, knee and hip replacements, cerebral palsy, childhood paralytic and developmental disorders, post surgical rehabilitation, cancer rehab.",
          bullets: [],
          iconStr: "UserPlus",
          color: "text-orange-600 bg-orange-50 border border-orange-100"
        },
        {
          id: 11,
          title: "DEPARTMENT OF MEDICAL GENETICS",
          description: "We are routinely karyotyping blood, bone marrow, amniotic fluid, abortuses and permanent cell lines. We also perform FISH in our laboratory. We are equipped with good quality tissue culture rooms and fluorescent microscope with software for karyotype analysis. The laboratory has team of well educated and devoted technicians with training in tissue culture and cytogenetics.",
          bullets: [],
          iconStr: "Dna",
          color: "text-fuchsia-600 bg-fuchsia-50 border border-fuchsia-100"
        }
      ];
    }
  } catch (e) {}

  return <UniqueFeaturesClientPage featuresData={featuresData} />;
}
