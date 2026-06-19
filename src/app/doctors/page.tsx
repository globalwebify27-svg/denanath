import { redirect } from 'next/navigation';

export default async function DoctorsRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const dept = params.department;
  
  if (dept && typeof dept === 'string') {
    redirect(`/doctor-details?department=${encodeURIComponent(dept)}`);
  } else {
    redirect('/doctor-details');
  }
}
