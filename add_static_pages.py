import re

with open("src/app/search/page.tsx", "r") as f:
    content = f.read()

# Define static pages to search
static_pages_code = """
  // Hardcoded static pages for search
  const ALL_STATIC_PAGES = [
    { id: 'static-contact', title: 'Contact Us', slug: 'contact-us', content: 'Get in touch with Deenanath Mangeshkar Hospital. Find our address, phone numbers, email, and location details.' },
    { id: 'static-careers', title: 'Careers', slug: 'careers', content: 'Join our team. Explore job openings and career opportunities at Deenanath Mangeshkar Hospital.' },
    { id: 'static-about', title: 'About Us', slug: 'about-dmh', content: 'Learn about Deenanath Mangeshkar Hospital, our mission, vision, and the legacy of providing ethical medical care.' },
    { id: 'static-opd', title: 'OPD Schedule', slug: 'opd-schedule', content: 'View the Outpatient Department (OPD) schedule and timings for our doctors and consultants.' },
    { id: 'static-book', title: 'Book Appointment', slug: 'book-appointment', content: 'Book an appointment with our specialist doctors online. Easy and quick scheduling.' },
    { id: 'static-events', title: 'Events & News', slug: 'events', content: 'Stay updated with the latest events, news, and announcements from our hospital.' },
    { id: 'static-health', title: 'Health Packages', slug: 'health-packages', content: 'Explore our comprehensive health check-up packages designed for preventive care.' }
  ];

  const matchedStaticPages = query ? ALL_STATIC_PAGES.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.content.toLowerCase().includes(query.toLowerCase())
  ) : [];
  
  // Merge static pages with dynamic pages
  dynamicPages = [...matchedStaticPages, ...dynamicPages];
"""

# Insert this before dynamicPages search logic in the file
target_string = """    dynamicPages = await prisma.dynamicPage.findMany({"""

content = content.replace(target_string, static_pages_code + "\n" + target_string)

with open("src/app/search/page.tsx", "w") as f:
    f.write(content)
