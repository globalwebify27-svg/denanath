import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import FeedbacksClientPage from "./client-page";

export const dynamic = "force-dynamic";


export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_feedbacks' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function FeedbacksPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_feedbacks' } });

  let pageData: any = {};
  try { 
    if (setting) {
      pageData = JSON.parse(setting.value);
    } else {
      // Fallback data
      pageData = {
        stories: [
          {
            title: "Generous help from Charity department made treatment possible",
            date: "24-Feb-2023",
            author: "Mrs Rajashri Anil Gavali",
            content: "My son was diagnosed with cancer and doctor told to operate immediately. Surgery was successful but after surgery doctor recommended 6 cycles of chemotherapy which was non affordable. I approached charity department for monetary help. They verified the documents and after completing the formalities and with financial support I could avail the treatment. I am grateful to Charity department and doctors who helped me in all ways to recover my son from Cancer."
          },
          {
            title: "Great support received from staff and doctors during transplant surgery",
            date: "15-Feb-2023",
            author: "Mrs Himali Pimpalkhare",
            content: "My aunty was admitted for Liver Transplant surgery which was unfortunately not successful but I wasn't to give special thanks to Doctors for their generous support. I want to appreciate the response received from Blood bank, where many known and unknown donors came forward to help when blood transfusion was required. Last but not the least the transplant co-ordinator and Billing staff also co-operated a lot for smooth transactions during admission and after discharge."
          },
          {
            title: "Where there is hope there is faith",
            date: "16-Jan-2023",
            author: "Mr Arvind Chintaman Daware",
            content: "I was suffering from gall bladder stones and in Ahmednagar consulted various doctors and did numerous tests but due to age and co-morbidities doctors denied to do surgery. Due to abdominal pain I was frustrated, one of doctors recommended me to go to Deenanath Mangeshkar Hospital and Research Center. After consultation surgery was done successfully. I am grateful to all doctors and staff who were involved in this surgery. All nurses in ward, doctors and reception staff are very polite and guide in proper manner whenever required."
          },
          {
            title: "Prompt action by doctors and excellent service by Mediclaim department",
            date: "21-Dec-2022",
            author: "Mr Shankar Gundal",
            content: "My wife got admitted in ICU for Hemodialysis, I appreciate the quick decision taken by doctors of admission and good treatment given. During discharge immediate help was provided by Mediclaim department for approval and excellent service during the complete process. I am thankful for the chance you gave me to appreciate you all."
          },
          {
            title: "Good doctors and financial help from charity made treatment possible",
            date: "27-Sep-2022",
            author: "Mr Dilip Ramchandra Kale",
            content: "My wife residing in Solapur is taking treatment for cancer in this hospital since last 7 days. Our experience through out the admission was great. Doctors guide us whenever we as queries and staff is also polite. When we needed financial help we were told to approach charity department as we did not have enough money to avail the further treatment. After approaching the charity department with proper documentation they helped us financially for the treatment. I am thankful to all the staff of Deenanath Mangeshkar Hospital and Research Center who were involved and special thanks to the doctors."
          }
        ]
      };
    }
  } catch (e) {}

  return <FeedbacksClientPage pageData={pageData} />;
}
