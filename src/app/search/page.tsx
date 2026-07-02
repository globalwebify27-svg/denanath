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

  if (query) {
    departments = await prisma.department.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
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
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#002b5c] mb-2">Search Results</h1>
        <p className="text-slate-600 mb-8">
          Showing results for <span className="font-semibold">"{query}"</span>
        </p>

        {query ? (
          <div className="space-y-10">
            {/* Departments Section */}
            <div>
              <h2 className="text-xl font-bold text-[#007a87] mb-4 border-b border-slate-200 pb-2">
                Departments ({departments.length})
              </h2>
              {departments.length > 0 ? (
                <div className="grid gap-4">
                  {departments.map((dept) => (
                    <Link
                      key={dept.id}
                      href={`/departments/${dept.id}`}
                      className="block p-5 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
                    >
                      <h3 className="text-lg font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors">
                        {dept.name}
                      </h3>
                      {dept.intro && (
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{dept.intro}</p>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No departments found matching your query.</p>
              )}
            </div>

            {/* Doctors Section */}
            <div>
              <h2 className="text-xl font-bold text-[#007a87] mb-4 border-b border-slate-200 pb-2">
                Doctors ({doctors.length})
              </h2>
              {doctors.length > 0 ? (
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
              ) : (
                <p className="text-slate-500 italic">No doctors found matching your query.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-slate-500">Please enter a search term in the header to find information.</p>
        )}
      </div>
    </div>
  );
}
