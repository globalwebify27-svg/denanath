"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types and Interfaces
export interface Department {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  icon: string;
  symptoms: string[];
  treatments: string[];
  opdHours: string;
  emergencyCare: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialtyId: string;
  specialtyName: string;
  qualifications: string;
  experience: number; // in years
  rating: number;
  availableDays: string[];
  timings: string;
  image: string;
  fee: number;
  bio: string;
}

export interface HealthPackage {
  id: string;
  name: string;
  price: number;
  category: string;
  tests: string[];
  description: string;
  recommendedFor: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorId: string;
  doctorName: string;
  specialtyName: string;
  date: string;
  timeSlot: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: "Health Tip" | "Research" | "Event" | "Announcement";
  date: string;
  summary: string;
  content: string;
  readTime: string;
  author: string;
}

interface HospitalContextType {
  departments: Department[];
  doctors: Doctor[];
  healthPackages: HealthPackage[];
  appointments: Appointment[];
  newsItems: NewsItem[];
  bookAppointment: (appointment: Omit<Appointment, "id" | "status" | "createdAt">) => Appointment;
  cancelAppointment: (id: string) => void;
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDeptFilter: string;
  setSelectedDeptFilter: (id: string) => void;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

// Initial Static Data (Representing DMH clinical profile)
const initialDepartments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology & Cardiac Surgery",
    shortDesc: "Pioneering cardiothoracic and vascular surgeries with high success rates.",
    longDesc: "Our world-class Cardiology center is equipped with advanced modular cath labs, dedicated cardiac ICUs, and robust electrophysiology labs. Led by Pune's finest cardiac surgeons, we perform complex bypass operations, angioplasty, pacemaker installations, and valve replacements.",
    icon: "Heart",
    symptoms: ["Chest pain", "Shortness of breath", "Palpitations", "Dizziness", "High Blood Pressure"],
    treatments: ["Coronary Angioplasty", "Coronary Artery Bypass (CABG)", "Pacemaker Implantation", "Heart Valve Repair"],
    opdHours: "09:00 AM - 07:00 PM (Mon - Sat)",
    emergencyCare: true,
  },
  {
    id: "neurology",
    name: "Neurology & Neurosurgery",
    shortDesc: "Comprehensive stroke management and advanced micro-neurosurgical procedures.",
    longDesc: "The Neurosciences Institute coordinates advanced diagnostic imaging (3T MRI, 128-slice CT) with complex surgical capabilities. We specialize in minimally invasive brain surgery, epilepsy control, Parkinson's therapies, pediatric neurosurgery, and traumatic spine injuries.",
    icon: "Brain",
    symptoms: ["Severe headaches", "Numbness", "Loss of balance", "Chronic tremors", "Memory lapses"],
    treatments: ["Micro-neurosurgery", "Brain Tumor Resection", "Spinal Fusion Surgery", "Stroke Rehabilitation"],
    opdHours: "10:00 AM - 06:00 PM (Mon - Sat)",
    emergencyCare: true,
  },
  {
    id: "oncology",
    name: "Oncology & Cancer Care",
    shortDesc: "Advanced immunotherapy, radiotherapy, and precision cancer therapeutics.",
    longDesc: "Our Oncology wing provides custom patient-centered cancer treatment. Integrating medical oncology, surgical oncology, and radiation therapies (featuring TrueBeam Linear Accelerator), our specialists work cohesively for early detection, tumor regression, and pain management.",
    icon: "ShieldAlert",
    symptoms: ["Unexplained weight loss", "Chronic fatigue", "Unusual lumps", "Persistent cough"],
    treatments: ["Targeted Chemotherapy", "Stereotactic Radiotherapy", "Oncosurgery", "Immunotherapy Sessions"],
    opdHours: "09:00 AM - 05:00 PM (Mon - Fri)",
    emergencyCare: false,
  },
  {
    id: "nephrology",
    name: "Nephrology & Kidney Transplants",
    shortDesc: "High-end dialysis units and dedicated kidney transplant protocols.",
    longDesc: "Dinanath Mangeshkar Hospital is a premier transplant hub. Our nephrology unit features an advanced hemodialysis wing, peritoneal dialysis training, and a state-of-the-art organ transplant ICU supporting safe, high-efficacy kidney transplant services.",
    icon: "Activity",
    symptoms: ["Swelling in feet/hands", "Frequent urination", "Blood in urine", "Chronic flank pain"],
    treatments: ["Kidney Transplant", "Continuous Hemodialysis", "Renal Biopsy", "AV Fistula Creation"],
    opdHours: "08:00 AM - 06:00 PM (Mon - Sat)",
    emergencyCare: true,
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics & Joint Replacement",
    shortDesc: "Specialized joint replacements, arthroscopic surgeries, and trauma care.",
    longDesc: "We provide comprehensive bone, joint, and spine care. Performing hundreds of successful knee and hip replacements each year, our department is also Pune's go-to emergency trauma center for complex sports injuries, fractures, and skeletal reconstructions.",
    icon: "Stethoscope",
    symptoms: ["Joint stiffness", "Severe knee pain", "Back discomfort", "Limited range of motion"],
    treatments: ["Total Knee Replacement", "Total Hip Arthroplasty", "Arthroscopic Ligament Repair (ACL)", "Spine Decompression"],
    opdHours: "09:00 AM - 08:00 PM (Mon - Sat)",
    emergencyCare: true,
  },
  {
    id: "pediatrics",
    name: "Paediatrics & Neonatal ICU (NICU)",
    shortDesc: "Dedicated Level-III NICU care and pediatric sub-specialty clinics.",
    longDesc: "Our specialized children's wing hosts a high-frequency pediatric department and a Level-III Neonatal Intensive Care Unit (NICU). We cover pediatric cardiology, child immunology, growth therapies, routine childhood immunizations, and pediatric emergency trauma.",
    icon: "Baby",
    symptoms: ["Persistent infant fever", "Developmental delays", "Severe asthma flares", "Feeding issues"],
    treatments: ["Neonatal Intensive Care", "Pediatric Asthma Care", "Childhood Immunization Programs", "Growth & Nutrition Therapy"],
    opdHours: "08:00 AM - 08:00 PM (Mon - Sat)",
    emergencyCare: true,
  }
];

const initialDoctors: Doctor[] = [
  {
    id: "dr-shirish-kelkar",
    name: "Dr. Shirish Kelkar",
    specialtyId: "cardiology",
    specialtyName: "Cardiology & Cardiac Surgery",
    qualifications: "MD, DM (Cardiology), FACC",
    experience: 26,
    rating: 4.9,
    availableDays: ["Monday", "Wednesday", "Friday"],
    timings: "10:00 AM - 02:00 PM",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop",
    fee: 1000,
    bio: "Dr. Shirish Kelkar is a pioneering interventional cardiologist in Maharashtra, specializing in complex angioplasties and structural heart disease interventions."
  },
  {
    id: "dr-anjali-deshpande",
    name: "Dr. Anjali Deshpande",
    specialtyId: "neurology",
    specialtyName: "Neurology & Neurosurgery",
    qualifications: "MS, MCh (Neurosurgery)",
    experience: 19,
    rating: 4.8,
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    timings: "11:00 AM - 04:00 PM",
    image: "https://www.dmhospital.org/images/Hospital/Doctor/Small-DMH/102_Pic.jpg",
    fee: 1200,
    bio: "Dr. Anjali Deshpande is an acclaimed brain specialist, focusing on micro-surgical tumor excisions, epilepsy surgeries, and precision spine rehabilitation."
  },
  {
    id: "dr-milind-kulkarni",
    name: "Dr. Milind Kulkarni",
    specialtyId: "oncology",
    specialtyName: "Oncology & Cancer Care",
    qualifications: "MD (Radiotherapy), DNB (Medical Oncology)",
    experience: 22,
    rating: 4.7,
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    timings: "02:00 PM - 05:30 PM",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop",
    fee: 1100,
    bio: "Dr. Milind Kulkarni integrates target-based chemotherapy and innovative immunotherapy solutions to treat complex oncological tumors with customized clinical care."
  },
  {
    id: "dr-smita-mangeshkar",
    name: "Dr. Smita Mangeshkar",
    specialtyId: "pediatrics",
    specialtyName: "Paediatrics & Neonatal ICU",
    qualifications: "MD (Paediatrics), Fellowship in Neonatology (UK)",
    experience: 16,
    rating: 4.9,
    availableDays: ["Monday", "Wednesday", "Saturday"],
    timings: "09:00 AM - 01:00 PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
    fee: 800,
    bio: "Dr. Smita Mangeshkar heads our Neonatal ICU services, bringing globally refined protocols in critical newborn care and infant developmental therapies."
  },
  {
    id: "dr-rajesh-shinde",
    name: "Dr. Rajesh Shinde",
    specialtyId: "nephrology",
    specialtyName: "Nephrology & Kidney Transplants",
    qualifications: "MD, DM (Nephrology)",
    experience: 20,
    rating: 4.8,
    availableDays: ["Wednesday", "Thursday", "Friday"],
    timings: "01:00 PM - 06:00 PM",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
    fee: 1000,
    bio: "Dr. Rajesh Shinde oversees kidney transplants, having successfully directed over 350+ renal transplants, alongside managing acute chronic kidney diseases."
  },
  {
    id: "dr-amit-patwardhan",
    name: "Dr. Amit Patwardhan",
    specialtyId: "orthopaedics",
    specialtyName: "Orthopaedics & Joint Replacement",
    qualifications: "MS (Orthopaedics), MCh (Orthopaedics, UK)",
    experience: 18,
    rating: 4.9,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
    timings: "03:00 PM - 07:00 PM",
    image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?q=80&w=300&auto=format&fit=crop",
    fee: 900,
    bio: "Dr. Amit Patwardhan is renowned for zero-error total knee replacements, utilizing computer-navigated systems, as well as complex sports medicine procedures."
  }
];

const initialPackages: HealthPackage[] = [
  {
    id: "executive-health",
    name: "Executive Comprehensive Health Package",
    price: 5500,
    category: "Whole Body Screening",
    tests: [
      "Complete Blood Count (CBC)", "Diabetes Profile (HbA1c & Fasting Glucose)",
      "Kidney Function Test (KFT)", "Lipid Panel (Cardiovascular)",
      "Liver Function Test (LFT)", "Thyroid Profile (TSH)",
      "Electrocardiogram (ECG)", "Ultrasound Abdomen & Pelvis",
      "Chest X-Ray", "Physical Consultation & Diet Counselling"
    ],
    description: "Our premier comprehensive wellness assessment designed specifically to identify early metabolic, kidney, liver, or cardiac issues.",
    recommendedFor: "Men & Women aged 30+"
  },
  {
    id: "advanced-cardiac",
    name: "Advanced Cardiac Assessment",
    price: 4200,
    category: "Cardiac Care",
    tests: [
      "Electrocardiogram (ECG)", "Echocardiogram (2D Echo)",
      "Cardiac Stress Test (TMT)", "Lipid Profile & Apolipoproteins",
      "HbA1c & Blood Sugar Fasting", "Serum Creatinine (Kidney)",
      "Cardiologist OPD Consultation"
    ],
    description: "A specialized cardiac review directed to inspect electrical cardiac rhythm, muscle health, and coronary block hazard potentials.",
    recommendedFor: "Individuals with family history of cardiac conditions, high stress, or hypertension."
  },
  {
    id: "women-wellness",
    name: "Tejaswini Women's Wellness Package",
    price: 3800,
    category: "Women's Health",
    tests: [
      "Complete Blood Count (CBC)", "Thyroid Panel (T3, T4, TSH)",
      "Bone Mineral Health (Calcium & Vit D3)", "Pap Smear Screening",
      "Mammography (Breast Scan) or USG Breast", "Diabetes Fasting",
      "Gynaecologist Special Consultation"
    ],
    description: "Formulated specifically to assess vital parameters in women's health, focusing on thyroid, bone health, and screen diagnostics.",
    recommendedFor: "Women aged 25+"
  },
  {
    id: "senior-citizen",
    name: "Senior Citizen Care (Gold)",
    price: 4800,
    category: "Geriatric Care",
    tests: [
      "Complete Blood Count & ESR", "Comprehensive Kidney Review",
      "Lipid Cardiopulmonary Profile", "Uric Acid (Joint Gout)",
      "Vitamin B12 & Vitamin D3 Levels", "HbA1c Diabetes Review",
      "PSA (for Men) / Mammography (for Women)", "Eye Screening & ECG",
      "Geriatric Consultation & Diet Guidance"
    ],
    description: "Dedicated geriatric assessment focusing on cognitive bone density, metabolic rates, prostate/breast risk markers, and renal outputs.",
    recommendedFor: "Senior citizens aged 60+"
  }
];

const initialNews: NewsItem[] = [
  {
    id: "news-1",
    title: "DMH Pioneers AI-Integrated Cardiac Screening in Pune",
    category: "Research",
    date: "May 10, 2026",
    summary: "Our Cardiology department integrates state-of-the-art predictive AI models to capture cardiac anomalies 48 hours prior to acute clinical symptoms.",
    content: "Dinanath Mangeshkar Hospital has officially integrated predictive Artificial Intelligence models inside our clinical cardiac screening procedures. By scanning continuous ECG telemetry records alongside patient medical history, the AI systems predict potential acute ischemia, block formations, or severe arrhythmia with an unprecedented 94.6% precision rate. This clinical breakthrough allows surgeons to optimize preventive medication, perform prophylactic angioplasty, and safeguard patients long before physical symptoms appear.",
    readTime: "4 min read",
    author: "Dr. Shirish Kelkar (Head of Cardiology)"
  },
  {
    id: "news-2",
    title: "Upcoming Preventative Diagnostics Rural Camp",
    category: "Event",
    date: "June 05, 2026",
    summary: "Dinanath Mangeshkar Hospital announces a massive free medical screening camp covering 15+ villages in outer Pune district.",
    content: "Continuing our commitment to human warmth and universal care, DMH Pune will dispatch a team of 45 medical consultants, dynamic testing vans, and essential surgical kits to the Bhor and Velhe rural sectors. Over a three-day duration, we aim to offer free clinical examinations, diagnostic ultrasound profiles, pediatric immunizations, and oncology checks to over 3,500 underprivileged individuals, with fully sponsored clinical follow-ups inside our Erandwane campus.",
    readTime: "3 min read",
    author: "Public Relations Officer"
  },
  {
    id: "news-3",
    title: "Overcoming Complex Brain Tumor: A Case Study",
    category: "Research",
    date: "April 28, 2026",
    summary: "How our Neuro-navigation theater safely removed a deep-seated cranial tumor in a 12-year-old child.",
    content: "A 12-year-old child presented with progressive ataxia, persistent visual blurriness, and severe occipital headaches. Diagnostics revealed a large, deep-seated tumor closely interfacing with the delicate brainstem. Using advanced intraoperative neuro-navigation alongside micro-ultrasonic aspirators, Dr. Anjali Deshpande and her neurosurgical team completed a high-precision 8-hour craniotomy. The deep tumor was resected completely with zero post-operative neurological deficits, demonstrating the incredible efficacy of next-gen clinical navigation systems.",
    readTime: "6 min read",
    author: "Dr. Anjali Deshpande (Chief Neurosurgeon)"
  }
];

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [departments] = useState<Department[]>(initialDepartments);
  const [doctors] = useState<Doctor[]>(initialDoctors);
  const [healthPackages] = useState<HealthPackage[]>(initialPackages);
  const [newsItems] = useState<NewsItem[]>(initialNews);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>("");

  // Load appointments from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("dmh_appointments");
    let initialApts: Appointment[] = [];
    if (saved) {
      try {
        initialApts = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load appointments", e);
      }
    } else {
      // Create a few mock baseline appointments
      initialApts = [
        {
          id: "apt-1",
          patientName: "Ahmad Sana",
          patientPhone: "+91 98765 43210",
          patientEmail: "ahmad.sana@example.com",
          doctorId: "dr-shirish-kelkar",
          doctorName: "Dr. Shirish Kelkar",
          specialtyName: "Cardiology & Cardiac Surgery",
          date: "2026-05-20",
          timeSlot: "10:30 AM",
          status: "Scheduled",
          createdAt: new Date().toISOString()
        },
        {
          id: "apt-2",
          patientName: "Rohan Joshi",
          patientPhone: "+91 91234 56789",
          patientEmail: "rohan@example.com",
          doctorId: "dr-anjali-deshpande",
          doctorName: "Dr. Anjali Deshpande",
          specialtyName: "Neurology & Neurosurgery",
          date: "2026-05-21",
          timeSlot: "12:00 PM",
          status: "Scheduled",
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem("dmh_appointments", JSON.stringify(initialApts));
    }
    
    // Defer state update to satisfy set-state-in-effect linter error
    const timer = setTimeout(() => {
      setAppointments(initialApts);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const saveAppointments = (newApts: Appointment[]) => {
    setAppointments(newApts);
    localStorage.setItem("dmh_appointments", JSON.stringify(newApts));
  };

  // State Mutators
  const bookAppointment = (details: Omit<Appointment, "id" | "status" | "createdAt">) => {
    const newApt: Appointment = {
      ...details,
      id: `apt-${Math.random().toString(36).substr(2, 9)}`,
      status: "Scheduled",
      createdAt: new Date().toISOString()
    };
    const updated = [newApt, ...appointments];
    saveAppointments(updated);
    return newApt;
  };

  const cancelAppointment = (id: string) => {
    const updated = appointments.map((apt) =>
      apt.id === id ? ({ ...apt, status: "Cancelled" } as Appointment) : apt
    );
    saveAppointments(updated);
  };

  const updateAppointmentStatus = (id: string, status: Appointment["status"]) => {
    const updated = appointments.map((apt) =>
      apt.id === id ? ({ ...apt, status } as Appointment) : apt
    );
    saveAppointments(updated);
  };

  return (
    <HospitalContext.Provider
      value={{
        departments,
        doctors,
        healthPackages,
        appointments,
        newsItems,
        bookAppointment,
        cancelAppointment,
        updateAppointmentStatus,
        searchQuery,
        setSearchQuery,
        selectedDeptFilter,
        setSelectedDeptFilter,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (context === undefined) {
    throw new Error("useHospital must be used within a HospitalProvider");
  }
  return context;
};
