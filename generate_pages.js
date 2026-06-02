const fs = require('fs');
const path = require('path');

const templateStr = fs.readFileSync(path.join(__dirname, 'template.txt'), 'utf8');

const config = [
  {
    group: "(doctors)",
    parentName: "Doctors & Departments",
    iconName: "Stethoscope",
    pages: [
      { name: "Doctor Details", path: "doctor-details" },
      { name: "Department Details", path: "department-details" },
      { name: "Services", path: "services" },
    ]
  },
  {
    group: "(research)",
    parentName: "Research",
    iconName: "Microscope",
    pages: [
      { name: "About Us", path: "research-about" },
      { name: "Training And Events", path: "training-events" },
      { name: "Awards", path: "awards" },
      { name: "Newsletter Articles", path: "newsletter-articles" },
      { name: "Publications", path: "publications" },
      { name: "Annual Reports", path: "annual-reports" },
      { name: "Sponsors & CROs", path: "sponsors-cros" },
      { name: "Contact Us", path: "research-contact" },
    ]
  },
  {
    group: "(academics)",
    parentName: "Academics",
    iconName: "GraduationCap",
    pages: [
      { name: "Academics", path: "academics" },
      { name: "Simulation Center", path: "simulation-center" },
    ]
  },
  {
    group: "(online-facilities)",
    parentName: "Online Facilities",
    iconName: "Globe",
    pages: [
      { name: "E-Mail Login (DMH Users)", path: "email-login" },
      { name: "Online Payment", path: "online-payment" },
      { name: "Patient Portal", path: "patient-portal" },
      { name: "Patient Registration Form", path: "patient-registration" },
    ]
  },
  {
    group: "", // top level
    parentName: "Hospital",
    iconName: "Building2",
    pages: [
      { name: "Careers", path: "careers" },
      { name: "Contact Us", path: "contact-us" },
      { name: "Book Appointment", path: "book-appointment" },
    ]
  }
];

const srcAppDir = path.join(__dirname, 'src', 'app');

config.forEach(section => {
  const options = section.pages.map(p => ({
    name: p.name,
    href: "/" + p.path,
    active: false
  }));

  section.pages.forEach(page => {
    // Clone options to set active state correctly for each page
    const pageOptions = options.map(opt => ({
      ...opt,
      active: opt.href === "/" + page.path
    }));

    const dirPath = section.group 
      ? path.join(srcAppDir, section.group, page.path)
      : path.join(srcAppDir, page.path);

    fs.mkdirSync(dirPath, { recursive: true });

    let content = templateStr;
    
    // Replace variables
    content = content.replace(/__ICON_NAME__/g, section.iconName);
    content = content.replace(/__PAGE_COMPONENT_NAME__/g, page.name.replace(/[^a-zA-Z0-9]/g, ''));
    content = content.replace(/__OPTIONS_JSON__/g, JSON.stringify(section.group ? pageOptions : [], null, 4));
    content = content.replace(/__PARENT_NAME__/g, section.parentName);
    content = content.replace(/__PAGE_NAME__/g, page.name);

    fs.writeFileSync(path.join(dirPath, 'page.tsx'), content.trim());
    console.log("Created " + path.join(dirPath, 'page.tsx'));
  });
});
