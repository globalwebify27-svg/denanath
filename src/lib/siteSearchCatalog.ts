export interface SiteCatalogItem {
  id: string;
  title: string;
  category: string;
  href: string;
  description: string;
  keywords: string[];
  settingKey?: string;
}

export const SITE_SEARCH_CATALOG: SiteCatalogItem[] = [
  // --- About Us ---
  {
    id: "about-hospital",
    title: "About Deenanath Mangeshkar Hospital",
    category: "About Us",
    href: "/about-hospital",
    description: "Multi-specialty hospital in Pune with state-of-the-art facilities, clinical departments, compassionate care, and research.",
    keywords: ["about", "hospital", "overview", "dmh", "mission", "vision", "trust", "lata mangeshkar", "deenanath", "history", "infrastructure", "beds"],
    settingKey: "page_about_hospital"
  },
  {
    id: "charity-details",
    title: "Charity Details (Information Regarding Charity)",
    category: "About Us",
    href: "/charity-details",
    description: "Detailed commitment to society providing subsidized and free medical treatments for indigent (निर्धन) and weaker (दुर्बल) sections.",
    keywords: ["charity", "charity details", "charitable", "indigent", "weaker sections", "nirdhan", "durbal", "financial aid", "trust", "subsidy", "concession", "poor patients"],
    settingKey: "page_charity_details"
  },
  {
    id: "support-donations",
    title: "Support Hospital / Donations",
    category: "About Us",
    href: "/supportHospitalDonations",
    description: "Support our charitable healthcare initiatives, patient welfare funds, and contribute through donations to DMH.",
    keywords: ["donation", "donate", "support", "contribute", "funds", "charity fund", "sponsor", "80g", "tax exemption"],
    settingKey: "page_support_donations"
  },
  {
    id: "unique-features",
    title: "Unique Features of DMH",
    category: "About Us",
    href: "/unique-features",
    description: "Distinct clinical landmarks, pioneering technology, cardiac trauma ambulances, and specialized care center facilities.",
    keywords: ["unique features", "highlights", "key features", "technology", "advancements", "specialties", "landmark"],
    settingKey: "page_unique_features"
  },
  {
    id: "associates",
    title: "Associates & Clinical Partners",
    category: "About Us",
    href: "/associates",
    description: "Our affiliated healthcare organizations, institutional partners, and clinical collaborations.",
    keywords: ["associates", "partners", "collaborations", "institutes", "affiliated"],
    settingKey: "page_associates"
  },
  {
    id: "accreditations",
    title: "Accreditations & Quality Standards",
    category: "About Us",
    href: "/accreditations",
    description: "National quality accreditations, NABH, NABL certifications, and clinical compliance records.",
    keywords: ["accreditations", "nabh", "nabl", "quality", "certifications", "standards", "compliance"],
    settingKey: "page_accreditations"
  },
  {
    id: "foreign-contribution",
    title: "Foreign Contribution (FCRA)",
    category: "About Us",
    href: "/foreign-contribution",
    description: "Foreign Contribution Regulation Act (FCRA) compliance, quarterly receipts, and institutional financial transparency.",
    keywords: ["foreign contribution", "fcra", "quarterly receipt", "international donations", "compliance"],
    settingKey: "page_foreign_contribution"
  },
  {
    id: "disclaimer",
    title: "Hospital Disclaimer & Terms",
    category: "About Us",
    href: "/disclaimer",
    description: "Legal disclaimer, medical advice notice, terms of website use, and institutional policies.",
    keywords: ["disclaimer", "legal", "terms", "policy", "privacy"],
    settingKey: "page_disclaimer"
  },

  // --- Academics & Simulation ---
  {
    id: "simulation-center",
    title: "Dr. Indumati Amodkar Simulation Center",
    category: "Academics & Simulation",
    href: "/simulation-center",
    description: "Modern healthcare simulation training facility with advanced medical mannequins, virtual reality, and emergency response training.",
    keywords: ["simulation", "simulation center", "simulator", "sim center", "indumati amodkar", "training", "mannequin", "virtual reality", "hands on", "clinical simulation", "medical training"],
    settingKey: "page_academics_simulation_center"
  },
  {
    id: "simulation-lab-1",
    title: "Simulation Center - Lab 1",
    category: "Academics & Simulation",
    href: "/simulation-center/lab-1",
    description: "Specialized simulation training laboratory 1 equipped with full-body patient simulators and telemetry.",
    keywords: ["simulation lab 1", "lab 1", "simulation", "simulator lab", "mannequin lab"],
    settingKey: "page_simulation_lab1"
  },
  {
    id: "simulation-lab-2",
    title: "Simulation Center - Lab 2",
    category: "Academics & Simulation",
    href: "/simulation-center/lab-2",
    description: "Simulation laboratory 2 dedicated to surgical skills, laparoscopy trainers, and task trainers.",
    keywords: ["simulation lab 2", "lab 2", "simulation", "surgical simulator", "laparoscopy"],
    settingKey: "page_simulation_lab2"
  },
  {
    id: "simulation-lab-3",
    title: "Simulation Center - Lab 3",
    category: "Academics & Simulation",
    href: "/simulation-center/lab-3",
    description: "Simulation laboratory 3 focused on pediatric, neonatal, and intensive care scenario simulations.",
    keywords: ["simulation lab 3", "lab 3", "simulation", "pediatric simulation", "neonatal simulation", "icu sim"],
    settingKey: "page_simulation_lab3"
  },
  {
    id: "simulation-other-facilities",
    title: "Simulation Center - Other Facilities",
    category: "Academics & Simulation",
    href: "/simulation-center/other-facilities",
    description: "Debriefing rooms, AV recording suites, control room facilities, and seminar rooms at the Simulation Center.",
    keywords: ["simulation facilities", "debriefing", "control room", "av suite", "simulation other facilities"],
    settingKey: "page_simulation_other_facilities"
  },
  {
    id: "academics-overview",
    title: "Academics & Medical Education",
    category: "Academics & Simulation",
    href: "/academics",
    description: "Comprehensive medical education, DNB postgraduate programs, clinical fellowships, and academic departments.",
    keywords: ["academics", "medical education", "education", "courses", "postgraduate", "medical students", "teaching", "residency"],
    settingKey: "page_academics_info"
  },
  {
    id: "nbems-courses",
    title: "NBEMS Courses (DNB / DrNB / FNB)",
    category: "Academics & Simulation",
    href: "/nbems-courses",
    description: "National Board of Examinations in Medical Sciences accredited DNB, DrNB super-specialty, and FNB fellowship courses.",
    keywords: ["nbems", "dnb", "drnb", "fnb", "national board", "post graduate", "diplomate", "courses", "specialty training"],
    settingKey: "page_academics_nbems"
  },
  {
    id: "jeevan-rekha",
    title: "Jeevan Rekha Training Course",
    category: "Academics & Simulation",
    href: "/jeevan-rekha",
    description: "Life-saving emergency response, basic and advanced life support (BLS/ACLS) training initiative by DMH.",
    keywords: ["jeevan rekha", "life support", "bls", "acls", "emergency training", "first aid", "cpr"],
    settingKey: "page_academics_jeevan_rekha"
  },
  {
    id: "training-programs",
    title: "Academic Training Programs",
    category: "Academics & Simulation",
    href: "/training-programs",
    description: "Nursing training, allied health science programs, internships, and observer training curriculum.",
    keywords: ["training programs", "internships", "fellowships", "nursing training", "paramedical", "observership"],
    settingKey: "page_academics_training_programs"
  },
  {
    id: "laryngology-fellowship",
    title: "Laryngology Fellowship",
    category: "Academics & Simulation",
    href: "/laryngology-fellowship",
    description: "Advanced clinical fellowship in laryngology, voice surgery, airway reconstruction, and phonosurgery.",
    keywords: ["laryngology fellowship", "voice surgery", "ent fellowship", "airway", "larynx", "vocal cords"],
  },
  {
    id: "neuro-radiology-fellowship",
    title: "Neuro Radiology Fellowship",
    category: "Academics & Simulation",
    href: "/neuro-radiology-fellowship",
    description: "Subspecialty clinical training and fellowship in diagnostic and interventional neuroradiology.",
    keywords: ["neuro radiology", "radiology fellowship", "neuroradiology", "brain imaging", "mri", "ct scan"],
  },
  {
    id: "vasant-nirmala-oswal-centre",
    title: "Vasant & Nirmala Oswal Centre",
    category: "Academics & Simulation",
    href: "/vasant-nirmala-oswal-centre",
    description: "State-of-the-art educational and audiology research center dedicated to voice, swallowing, and ENT disorders.",
    keywords: ["vasant nirmala oswal", "oswal centre", "voice centre", "audiology", "ent centre", "swallowing disorders"],
  },

  // --- Research ---
  {
    id: "research-awards",
    title: "Awards & Recognitions",
    category: "Research",
    href: "/awards",
    description: "Honors, medical conference accolades, national prizes, and research paper awards received by DMH doctors.",
    keywords: ["awards", "recognitions", "honors", "prizes", "achievements", "medals", "accolades", "mapcon", "research awards"],
    settingKey: "page_research_awards"
  },
  {
    id: "research-about",
    title: "Research & Development Center",
    category: "Research",
    href: "/research-about",
    description: "Institutional research center leading clinical trials, epidemiological studies, molecular diagnostics, and publications.",
    keywords: ["research", "research center", "clinical research", "trials", "studies", "investigation", "dmhrc"],
    settingKey: "page_research_about"
  },
  {
    id: "training-events",
    title: "Research Training & Events",
    category: "Research",
    href: "/training-events",
    description: "Upcoming medical conferences, CME workshops, clinical symposia, and academic research seminars.",
    keywords: ["training and events", "training events", "cme", "workshops", "seminars", "conferences", "symposium"],
    settingKey: "page_training_events"
  },
  {
    id: "newsletter-articles",
    title: "Newsletter & Scientific Articles",
    category: "Research",
    href: "/newsletter-articles",
    description: "Hospital clinical newsletter editions, case reports, review articles, and scientific medical publications.",
    keywords: ["newsletter", "articles", "bulletin", "case reports", "scientific papers", "monthly newsletter"],
    settingKey: "page_research_newsletter_articles"
  },
  {
    id: "publications",
    title: "Medical Publications",
    category: "Research",
    href: "/publications",
    description: "Peer-reviewed medical journal publications, book chapters, and indexed papers by our medical faculty.",
    keywords: ["publications", "papers", "journal articles", "pubmed", "indexed papers", "research publications"],
    settingKey: "page_research_publications"
  },
  {
    id: "annual-reports",
    title: "Hospital Annual Reports",
    category: "Research",
    href: "/annual-reports",
    description: "Comprehensive annual progress reports documenting hospital clinical outcomes, research, and financial summaries.",
    keywords: ["annual reports", "report", "audited reports", "hospital progress", "yearly report"],
    settingKey: "page_research_annual_reports"
  },
  {
    id: "sponsors-cros",
    title: "Sponsors & Contract Research Organizations (CROs)",
    category: "Research",
    href: "/sponsors-cros",
    description: "Collaboration information, ethics committee guidelines, and trial management for clinical trial sponsors and CROs.",
    keywords: ["sponsors", "cros", "clinical trials", "sponsor", "cro", "pharmaceutical research"],
    settingKey: "page_research_sponsors_cros"
  },
  {
    id: "research-contact",
    title: "Research Contact Us",
    category: "Research",
    href: "/research-contact",
    description: "Contact the Department of Research, ethics committee secretariat, and clinical trial coordinators.",
    keywords: ["research contact", "ethics committee contact", "clinical trials desk", "research office"],
    settingKey: "page_research_contact"
  },
  {
    id: "ec-approval",
    title: "Ethics Committee (EC) Approval",
    category: "Research",
    href: "/ec-approval",
    description: "Institutional Ethics Committee (IEC) registration, DCGI certification, and protocol submission guidelines.",
    keywords: ["ec approval", "ethics committee", "iec", "dcgi", "protocol approval", "irb"],
    settingKey: "page_ec_approval"
  },

  // --- Patient & Visitors ---
  {
    id: "virtual-tour",
    title: "Virtual Tour of DMH",
    category: "Patient & Visitors",
    href: "/virtual-tour",
    description: "Explore Deenanath Mangeshkar Hospital campus, patient rooms, ICU, diagnostic labs, and operation theatres virtually.",
    keywords: ["virtual tour", "tour", "360 tour", "campus tour", "hospital photos", "walkthrough", "rooms", "icu tour", "campus view"],
    settingKey: "page_virtual_tour"
  },
  {
    id: "out-patient-guide",
    title: "Out-Patient (OPD) Guide",
    category: "Patient & Visitors",
    href: "/out-patient",
    description: "Guide for clinic consultation, registration procedures, appointment booking, billing, and pharmacy pickup.",
    keywords: ["out patient", "opd", "outpatient guide", "consultation", "clinic", "registration", "visit"],
    settingKey: "page_out_patient"
  },
  {
    id: "in-patient-guide",
    title: "In-Patient (IPD) Guide",
    category: "Patient & Visitors",
    href: "/in-patient",
    description: "Admission procedures, room categories, tariffs, visitor passes, discharge guidelines, and insurance clearance.",
    keywords: ["in patient", "ipd", "admission", "bed", "room tariff", "discharge", "visitor pass", "cashless"],
    settingKey: "page_in_patient"
  },
  {
    id: "health-packages",
    title: "Preventive Health Checkup Packages",
    category: "Patient & Visitors",
    href: "/health-packages",
    description: "Comprehensive preventive health packages, executive checkups, cardiac wellness, diabetic, and senior citizen screenings.",
    keywords: ["health packages", "health checkup", "executive checkup", "preventive health", "blood test package", "body checkup"],
    settingKey: "page_health_packages"
  },
  {
    id: "facilities",
    title: "Hospital Facilities & Amenities",
    category: "Patient & Visitors",
    href: "/facilities",
    description: "24/7 emergency, pathology, radiology, pharmacy, cafeteria, ATM, parking, and patient welfare amenities.",
    keywords: ["facilities", "amenities", "cafeteria", "canteen", "parking", "atm", "pharmacy", "services"],
    settingKey: "page_facilities"
  },
  {
    id: "feedbacks-stories",
    title: "Patient Stories & Testimonials",
    category: "Patient & Visitors",
    href: "/feedbacks",
    description: "Inspiring recovery journeys, feedback, and testimonials from patients treated at Deenanath Mangeshkar Hospital.",
    keywords: ["patient stories", "feedbacks", "testimonials", "reviews", "experiences", "patient voice"],
    settingKey: "page_feedbacks"
  },
  {
    id: "patient-rights",
    title: "Patient Rights & Responsibilities",
    category: "Patient & Visitors",
    href: "/patient-rights",
    description: "Patient charter outlining rights to respect, privacy, informed consent, safety, and visitor responsibilities.",
    keywords: ["patient rights", "responsibilities", "charter", "consent", "privacy", "ethics"],
    settingKey: "page_patient_rights"
  },
  {
    id: "gallery-photos",
    title: "Photo Gallery",
    category: "Patient & Visitors",
    href: "/gallery-photos",
    description: "Photo archives of hospital infrastructure, clinical ceremonies, inaugurations, and community outreach.",
    keywords: ["photo gallery", "photos", "pictures", "images", "hospital pictures", "album"],
    settingKey: "page_gallery_photos"
  },
  {
    id: "gallery-videos",
    title: "Video Gallery",
    category: "Patient & Visitors",
    href: "/gallery-videos",
    description: "Educational health talks, patient recovery stories, expert doctor interviews, and hospital video features.",
    keywords: ["video gallery", "videos", "health talks", "doctor interviews", "youtube videos"],
    settingKey: "page_gallery_videos"
  },
  {
    id: "opd-schedule",
    title: "OPD Schedule & Doctor Timings",
    category: "Patient & Visitors",
    href: "/out-patient-department",
    description: "Daily and weekly Outpatient Department clinic schedule with consulting doctor names, room numbers, and timings.",
    keywords: ["opd schedule", "doctor timings", "schedule", "clinic timings", "consultation hours", "timetable"],
    settingKey: "page_opd_schedule"
  },

  // --- Top Header Pages ---
  {
    id: "emergency",
    title: "Emergency & Trauma Department (EMS)",
    category: "Top Header",
    href: "/emergency",
    description: "24-hour round-the-clock Emergency Medical Services (EMS), resuscitation, trauma bay, and critical acute care.",
    keywords: ["emergency", "casualty", "trauma", "ems", "acute care", "24/7", "accident", "urgent care", "resuscitation"],
    settingKey: "page_emergency"
  },
  {
    id: "ambulance",
    title: "Ambulance Services (Cardiac & Trauma ICU on Wheels)",
    category: "Top Header",
    href: "/ambulance",
    description: "24/7 dedicated ambulance helpline: 020 40151540. Cardiac ICU-on-wheels ambulances, ventilators, and 2-wheeler doctor response.",
    keywords: ["ambulance", "call ambulance", "icu on wheels", "cardiac ambulance", "trauma ambulance", "020 40151540", "transport"],
  },
  {
    id: "blood-bank",
    title: "Blood Centre & Transfusion Medicine",
    category: "Top Header",
    href: "/blood-bank",
    description: "24/7 Blood Bank providing component separation, plateletpheresis, ID-NAT screening, and voluntary blood donation camps.",
    keywords: ["blood bank", "blood centre", "blood donation", "platelets", "plasma", "transfusion", "prbc", "apheresis"],
    settingKey: "page_blood_bank"
  },
  {
    id: "pharmacy",
    title: "Pharmacy Services",
    category: "Top Header",
    href: "/pharmacy",
    description: "24-hour in-house retail and IPD pharmacy dispensing genuine medications, surgical disposables, and cold-chain drugs.",
    keywords: ["pharmacy", "medical store", "medicines", "drugs", "prescription", "24 hours pharmacy", "chemist"],
    settingKey: "page_pharmacy"
  },

  // --- Doctors & Clinical Departments ---
  {
    id: "doctors-directory",
    title: "Doctors Directory (Specialist Roster)",
    category: "Doctors & Departments",
    href: "/doctors",
    description: "Search and consult over 300+ leading clinical specialists, surgeons, and physicians at DMH.",
    keywords: ["doctors", "find doctor", "specialists", "surgeons", "physicians", "consultants", "faculty", "doctor list"]
  },
  {
    id: "departments-overview",
    title: "Clinical Departments Directory",
    category: "Doctors & Departments",
    href: "/departments",
    description: "Comprehensive listing of all medical and surgical clinical departments, diagnostics, and super-specialty units.",
    keywords: ["departments", "specialties", "clinical units", "centers of excellence", "medical divisions"]
  },
  {
    id: "services-overview",
    title: "Hospital Medical Services",
    category: "Doctors & Departments",
    href: "/services",
    description: "Full suite of healthcare, diagnostic, critical care, surgical, and therapeutic patient care services.",
    keywords: ["services", "medical services", "clinical services", "hospital facilities", "healthcare services"]
  },

  // --- Pricing & Appointments ---
  {
    id: "book-appointment",
    title: "Book Doctor Appointment Online",
    category: "Online Facilities",
    href: "/Appointment",
    description: "Book an outpatient clinic appointment with our specialist doctors online quickly and conveniently.",
    keywords: ["book appointment", "appointment", "consultation", "doctor appointment", "schedule appointment"],
    settingKey: "page_hospital_book_appointment"
  },
  {
    id: "cathlab-pricing",
    title: "Cathlab Stent Pricing Transparency",
    category: "Pricing & Compliance",
    href: "/cathlab-pricing",
    description: "Government-compliant transparent price caps and tariffs for coronary stents, balloons, and cathlab procedures.",
    keywords: ["cathlab pricing", "stent price", "cardiac stent", "nppa pricing", "angioplasty cost", "cath lab tariff"],
    settingKey: "page_cathlab_pricing"
  },
  {
    id: "implant-pricing",
    title: "Orthopaedic Implant Pricing Transparency",
    category: "Pricing & Compliance",
    href: "/implant-pricing",
    description: "Transparent knee, hip, and surgical implant pricing disclosure per government regulatory guidelines.",
    keywords: ["implant pricing", "knee implant", "hip implant", "ortho implant price", "surgical implants cost"],
    settingKey: "page_implant_pricing"
  },

  // --- Online Facilities ---
  {
    id: "online-payment",
    title: "Online Bill Payment",
    category: "Online Facilities",
    href: "/online-payment",
    description: "Make secure online payments for hospital OPD/IPD invoices, advance deposits, and diagnostic tests.",
    keywords: ["online payment", "pay bill", "hospital payment", "payment gateway", "online payment portal"],
    settingKey: "page_online-facilities_online_payment"
  },
  {
    id: "patient-portal",
    title: "Patient Portal (Health Records & Reports)",
    category: "Online Facilities",
    href: "/patient-portal",
    description: "Access your digital medical records, lab investigation reports, radiology findings, and discharge summaries.",
    keywords: ["patient portal", "reports", "lab reports", "test reports", "phr", "medical records", "online reports"],
    settingKey: "page_online-facilities_patient_portal"
  },
  {
    id: "patient-registration",
    title: "Patient Registration Form",
    category: "Online Facilities",
    href: "/patient-registration",
    description: "Pre-register as a new patient online to save consultation waiting time at the registration desk.",
    keywords: ["patient registration", "register online", "new patient", "registration form", "uhid"],
    settingKey: "page_online-facilities_patient_registration"
  },
  {
    id: "email-login",
    title: "E-Mail Login (Staff & Faculty)",
    category: "Online Facilities",
    href: "/email-login",
    description: "Webmail portal for hospital doctors, faculty, and administrative staff.",
    keywords: ["email login", "webmail", "staff email", "dmh users", "doctor login"],
    settingKey: "page_online-facilities_email_login"
  },

  // --- General & Contact ---
  {
    id: "careers",
    title: "Careers & Job Openings",
    category: "General",
    href: "/careers",
    description: "Explore career opportunities, nursing vacancies, medical consultant openings, and administrative jobs at DMH.",
    keywords: ["careers", "jobs", "vacancies", "nursing jobs", "doctor jobs", "employment", "recruitment", "work at dmh"],
    settingKey: "page_careers"
  },
  {
    id: "contact-us",
    title: "Contact Us & Campus Location",
    category: "General",
    href: "/contact-us",
    description: "Hospital phone lines: 020 40151000. Address: Near Mhatre Bridge, Erandwane, Pune 411004. Route map and email contacts.",
    keywords: ["contact us", "contact", "address", "phone", "email", "location", "erandwane", "mhatre bridge", "helpdesk"],
    settingKey: "page_contact"
  },
  {
    id: "events",
    title: "News & Hospital Events",
    category: "General",
    href: "/events",
    description: "Latest hospital announcements, press releases, community health camps, and clinical milestones.",
    keywords: ["events", "news", "announcements", "health camps", "press release", "updates"],
    settingKey: "page_events"
  },
  {
    id: "site-map",
    title: "Hospital Sitemap",
    category: "General",
    href: "/site-map",
    description: "Complete navigation index of all hospital services, specialty departments, and patient resources.",
    keywords: ["sitemap", "site map", "index", "navigation", "directory"]
  }
];
