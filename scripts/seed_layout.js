const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const baseNavLinks = [
  {
    name: "About Us",
    href: "/about-hospital",
    isActive: true,
    dropdown: [
      { name: "About Hospital", href: "/about-hospital", isActive: true },
      { name: "Associates", href: "/associates", isActive: true },
      { name: "Accreditations", href: "/accreditations", isActive: true },
      { name: "Support Hospital / Donations", href: "/supportHospitalDonations", isActive: true },
      { name: "Unique features of DMH", href: "/unique-features", isActive: true },
      { name: "Foreign Contribution", href: "/foreign-contribution", isActive: true },
      { name: "Charity Details", href: "/charity-details", isActive: true },
    ],
  },
  {
    name: "Patient & Visitors",
    href: "/out-patient",
    isActive: true,
    dropdown: [
      { name: "Out Patient Guide", href: "/out-patient", isActive: true },
      { name: "In Patient Guide", href: "/in-patient", isActive: true },
      { name: "Health Packages", href: "/health-packages", isActive: true },
      { name: "Facilities", href: "/facilities", isActive: true },
      { name: "Virtual Tour", href: "/virtual-tour", isActive: true },
      { name: "Patients Stories / Feedbacks", href: "/feedbacks", isActive: true },
      { name: "Patient Rights & Responsibilities", href: "/patient-rights", isActive: true },
      { name: "Photos", href: "/gallery-photos", isActive: true },
      { name: "Videos", href: "/gallery-videos", isActive: true },
    ],
  },
  {
    name: "Doctors & Departments",
    href: "/doctor-details",
    isActive: true,
    dropdown: [
      { name: "Doctor Details", href: "/doctor-details", isActive: true },
      { name: "Department Details", href: "/departments", isActive: true },
      { name: "Services", href: "/services", isActive: true },
    ],
  },
  {
    name: "Research",
    href: "/research-about",
    isActive: true,
    dropdown: [
      { name: "About Us", href: "/research-about", isActive: true },
      { name: "Training And Events", href: "/training-events", isActive: true },
      { name: "Awards", href: "/awards", isActive: true },
      { name: "Newsletter Articles", href: "/newsletter-articles", isActive: true },
      { name: "Publications", href: "/publications", isActive: true },
      { name: "Annual Reports", href: "/annual-reports", isActive: true },
      { name: "Sponsors & CROs", href: "/sponsors-cros", isActive: true },
      { name: "Contact Us", href: "/research-contact", isActive: true },
    ],
  },
  {
    name: "Academics",
    href: "/academics",
    isActive: true,
    dropdown: [
      { name: "Academics", href: "/academics", isActive: true },
      { name: "Simulation Center", href: "/simulation-center", isActive: true },
    ],
  },
  {
    name: "Online Facilities",
    href: "/email-login",
    isActive: true,
    dropdown: [
      { name: "E-Mail Login (DMH Users)", href: "/email-login", isActive: true },
      { name: "Online Payment", href: "/online-payment", isActive: true },
      { name: "Patient Portal", href: "/patient-portal", isActive: true },
      { name: "Patient Registration Form", href: "/patient-registration", isActive: true },
    ],
  },
  {
    name: "Careers",
    href: "/careers",
    isActive: true,
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    isActive: true,
  },
];

const layout_top_header = {
  emergencyText: "Emergency",
  emergencyLink: "/emergency",
  bloodBankText: "Blood Bank",
  bloodBankLink: "/blood-bank",
  pharmacyText: "Pharmacy",
  pharmacyLink: "/pharmacy",
  ambulanceText: "Ambulance",
  ambulanceLink: "/ambulance",
  whatsappText: "WhatsApp Us (24/7)",
  whatsappNumber: "912040151515",
  phoneText: "+91 20 4015 1000 (24/7)",
  phoneNumber: "+912040151000",
  playStoreLink: "https://play.google.com/store/apps/details?id=org.dmhospital.app&hl=en",
  appStoreLink: "https://apps.apple.com/in/app/deenanath-mangeshkar-hospital/id1187525263",
  isActive: true
};

const layout_header = {
  logo: "/images/Untitled design11.png",
  yearsImage: "/images/ChatGPT Image Jul 27, 2026, 05_05_55 PM (1)_transparent.png",
  menus: baseNavLinks
};

const layout_footer = {
  logo: "/images/Untitled design11.png",
  description: "Deenanath Mangeshkar Hospital and Research Center is Pune's leading clinical landmark, combining state-of-the-art diagnostics with legendary medical experts and warm, ethical care.",
  managedBy: "Managed by Lata Mangeshkar Foundation",
  socialLinks: [
    { platform: "Facebook", href: "https://www.facebook.com", isActive: true },
    { platform: "Twitter", href: "https://twitter.com", isActive: true },
    { platform: "YouTube", href: "https://www.youtube.com", isActive: true },
    { platform: "LinkedIn", href: "https://www.linkedin.com", isActive: true },
    { platform: "Instagram", href: "https://www.instagram.com", isActive: true }
  ],
  quickChannels1: [
    { label: "About Us", href: "/about-hospital", isActive: true },
    { label: "Patient & Visitors", href: "/out-patient", isActive: true },
    { label: "Doctors & Departments", href: "/doctor-details", isActive: true },
    { label: "Research", href: "/research-about", isActive: true },
    { label: "Academics", href: "/academics", isActive: true },
    { label: "Online Facilities", href: "/email-login", isActive: true },
    { label: "Book Appointment", href: "/book-appointment", isActive: true },
    { label: "Testimonials", href: "/#testimonials", isActive: true },
    { label: "Photo Gallery", href: "/gallery-photos", isActive: true },
    { label: "Video Gallery", href: "/gallery-videos", isActive: true }
  ],
  quickChannels2: [
    { label: "Emergency", href: "/emergency", isActive: true },
    { label: "Pharmacy", href: "/pharmacy", isActive: true },
    { label: "Ambulance", href: "/ambulance", isActive: true },
    { label: "Blood Bank", href: "/blood-bank", isActive: true },
    { label: "Careers", href: "/careers", isActive: true },
    { label: "Contact Us", href: "/contact-us", isActive: true },
    { label: "OPD Schedule", href: "/opd-schedule", isActive: true },
    { label: "EC Approval", href: "/ec-approval", isActive: true },
    { label: "Site Map", href: "/site-map", isActive: true },
    { label: "Disclaimer", href: "/disclaimer", isActive: true }
  ],
  address: "Near Mhatre Bridge, Erandwane, Pune, Maharashtra – 411004, India",
  phone: "+91 20 4015 1000",
  email: "info@dmhospital.org",
  mapLink: "https://maps.google.com/?q=Deenanath+Mangeshkar+Hospital+Pune",
  copyrightText: "Deenanath Mangeshkar Hospital and Research Center. All rights reserved.",
  heartbeatText1: "Delivering Clinical Excellence with",
  heartbeatText2: "Human Warmth"
};

async function seed() {
  console.log("Seeding Layout Settings...");
  
  await prisma.siteSetting.upsert({
    where: { key: 'layout_top_header' },
    update: {},
    create: { key: 'layout_top_header', value: JSON.stringify(layout_top_header) }
  });
  
  await prisma.siteSetting.upsert({
    where: { key: 'layout_header' },
    update: {},
    create: { key: 'layout_header', value: JSON.stringify(layout_header) }
  });

  await prisma.siteSetting.upsert({
    where: { key: 'layout_footer' },
    update: {},
    create: { key: 'layout_footer', value: JSON.stringify(layout_footer) }
  });

  console.log("Layout Settings Seeded Successfully.");
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
