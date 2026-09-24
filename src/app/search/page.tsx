import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q || '';

  let departments: any[] = [];
  let doctors: any[] = [];
  let pages: any[] = [];

  if (query) {
    departments = await prisma.department.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { seoKeywords: { contains: query } },
        ],
      },
    });

    doctors = await prisma.doctor.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { qualifications: { contains: query } },
          { specialty: { contains: query } },
        ],
      },
    });

    // DB dynamic pages
    const dbPages = await prisma.dynamicPage.findMany({
      where: {
        status: true,
        OR: [
          { title: { contains: query } },
          { seoKeywords: { contains: query } },
        ],
      },
    });

    // Static pages (hardcoded routes not in DB)
    const STATIC_PAGES = [
      { id: 'sp-contact', title: 'Contact Us', slug: 'contact-us', content: 'Get in touch. Phone numbers, email, and location details.' },
      { id: 'sp-careers', title: 'Careers', slug: 'careers', content: 'Job openings and career opportunities at Deenanath Mangeshkar Hospital.' },
      { id: 'sp-about', title: 'About Us', slug: 'about-dmh', content: 'About Deenanath Mangeshkar Hospital, mission, vision, and history.' },
      { id: 'sp-opd', title: 'OPD Schedule', slug: 'opd-schedule', content: 'Outpatient Department schedule and timings for doctors.' },
      { id: 'sp-book', title: 'Book Appointment', slug: 'book-appointment', content: 'Book an appointment with our specialist doctors online.' },
      { id: 'sp-events', title: 'Events & News', slug: 'events', content: 'Latest events, news, and announcements from our hospital.' },
      { id: 'sp-health', title: 'Health Packages', slug: 'health-packages', content: 'Health check-up packages for preventive care.' },
      { id: 'sp-doctors', title: 'Doctors & Departments', slug: 'doctors-departments', content: 'Browse all specialist doctors and clinical departments.' },
      { id: 'sp-research', title: 'Research', slug: 'research-about', content: 'Medical research, ethics committees, and publications.' },
      { id: 'sp-facilities', title: 'Facilities', slug: 'facilities', content: 'World-class facilities and services at our hospital.' },
      { id: 'sp-patient', title: 'Patient & Visitors', slug: 'patient-guide', content: 'Patient guide, visitor information, in-patient and out-patient services.' },
      { id: 'sp-blogs', title: 'Blogs & Articles', slug: 'blogs', content: 'Health tips, medical articles, and blogs by our expert doctors.' },
      { id: 'sp-inpatient', title: 'In-Patient Guide', slug: 'in-patient', content: 'In-patient admission, room details, tariffs, and patient guidelines.' },
      { id: 'sp-outpatient', title: 'Out-Patient Guide', slug: 'out-patient', content: 'Out-patient department guide, OPD services and timings.' },
      { id: 'sp-bloodbank', title: 'Blood Bank', slug: 'blood-bank', content: 'Blood bank services, blood donation, and availability.' },
    ];

    const matchedStatic = STATIC_PAGES.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.content.toLowerCase().includes(query.toLowerCase())
    );

    // Correctly merge — no overwrite bug
    pages = [...matchedStatic, ...dbPages];
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#002b5c] mb-2">Search Results</h1>
        <p className="text-slate-600 mb-8">
          Showing results for <span className="font-semibold">&quot;{query}&quot;</span>
        </p>

        {query ? (
          <div className="space-y-10">
            {pages.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#007a87] mb-4 border-b border-slate-200 pb-2">
                  Pages ({pages.length})
                </h2>
                <div className="grid gap-4">
                  {pages.map((page) => (
                    <Link
                      key={page.id}
                      href={`/${page.slug}`}
                      className="block p-5 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
                    >
                      <h3 className="text-base font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors">
                        {page.title}
                      </h3>
                      {page.content && (
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                          {page.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {departments.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#007a87] mb-4 border-b border-slate-200 pb-2">
                  Departments ({departments.length})
                </h2>
                <div className="grid gap-4">
                  {departments.map((dept) => (
                    <Link
                      key={dept.id}
                      href={`/departments/${dept.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                      className="block p-5 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
                    >
                      <h3 className="text-base font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors">
                        {dept.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {doctors.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#007a87] mb-4 border-b border-slate-200 pb-2">
                  Doctors ({doctors.length})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {doctors.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-5 bg-white rounded-xl shadow-sm border border-slate-100 flex items-start gap-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden shrink-0">
                        {doc.image ? (
                          <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-teal-50 text-[#007a87] font-bold text-xl">
                            {doc.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#002b5c]">{doc.name}</h3>
                        <p className="text-xs text-slate-600 font-medium mt-1">{doc.specialty}</p>
                        <p className="text-xs text-slate-500 mt-1">{doc.qualifications}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pages.length === 0 && departments.length === 0 && doctors.length === 0 && (
              <p className="text-slate-500 italic">No results found for &quot;{query}&quot;. Try a different search term.</p>
            )}
          </div>
        ) : (
          <p className="text-slate-500">Please enter a search term in the header to find information.</p>
        )}
      </div>
    </div>
  );
}
