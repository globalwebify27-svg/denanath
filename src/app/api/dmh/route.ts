import { NextResponse } from 'next/server';
import { DMH_API_CONFIG } from '@/lib/dmhApi';
import { prisma } from '@/lib/prisma';

let cachedDrAhis: { data: any[]; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

async function getFallbackDoctorsFromDb(): Promise<any[]> {
  try {
    const dbDocs = await prisma.doctor.findMany({
      orderBy: { name: 'asc' },
    });
    return dbDocs.map((doc: any) => ({
      doctor_id: doc.dmhDoctorId || doc.id,
      doctor_code: doc.dmhDoctorId || doc.id,
      speciality_id: doc.dmhSpecialityId || '',
      speciality_name: doc.specialty || '',
      doctor_name: doc.name,
      first_name: doc.name?.replace(/^Dr\.\s*/i, '').split(' ')[0] || '',
      last_name: doc.name?.replace(/^Dr\.\s*/i, '').split(' ').slice(1).join(' ') || '',
      gender: doc.gender || '',
      qualification: doc.qualifications || '',
      consultant_type: doc.consultantType || 'Consultant',
      OpdScheduleYN: doc.hasOpdSchedule || (doc.timings && doc.timings !== '[]') ? 'Yes' : 'No',
      service_point_id: doc.dmhServicePointId || null,
      service_center_id: doc.dmhServiceCenterId || null,
      doctorImage: doc.image || '',
      photo: doc.image || '',
      isApp: 'N',
    }));
  } catch (err) {
    console.error('[DMH API] DB Fallback error for doctors:', err);
    return [];
  }
}

async function getCachedOrFetchDrAhis(): Promise<any[]> {
  const now = Date.now();
  if (cachedDrAhis && now - cachedDrAhis.timestamp < CACHE_TTL) {
    return cachedDrAhis.data;
  }
  try {
    const drAhisUrl = `${DMH_API_CONFIG.baseUrl}doctorList.php`;
    const drAhisRes = await fetch(drAhisUrl, {
      method: 'POST',
      headers: DMH_API_CONFIG.headers,
      body: JSON.stringify({ action: 'drAhis' }),
    });
    if (!drAhisRes.ok) {
      console.warn(`[DMH API] drAhis HTTP error ${drAhisRes.status}, falling back to DB`);
      const fallback = await getFallbackDoctorsFromDb();
      if (fallback.length > 0) cachedDrAhis = { data: fallback, timestamp: now };
      return fallback;
    }
    const text = await drAhisRes.text();
    const parsed = JSON.parse(text);
    const allDocs = parsed.drAhisJSON || [];
    if (Array.isArray(allDocs) && allDocs.length > 0) {
      cachedDrAhis = { data: allDocs, timestamp: now };
      return allDocs;
    }
    const fallback = await getFallbackDoctorsFromDb();
    if (fallback.length > 0) cachedDrAhis = { data: fallback, timestamp: now };
    return fallback;
  } catch (e) {
    console.error('[DMH API] drAhis fetch/parse error, falling back to DB:', e);
    const fallback = await getFallbackDoctorsFromDb();
    if (fallback.length > 0) cachedDrAhis = { data: fallback, timestamp: now };
    return fallback;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...restParams } = body;

    // ── Special case: speciality ─────────────────────────────────────────────
    // The external backend doctorList.php { action: 'speciality' } only returns
    // 80 specialties and omits critical specialties like CANCER GENETICS (id: 79),
    // ALLERGY CLINIC (id: 103), LUNG TRANSPLANT (id: 104), etc.
    // We merge drAhis specialties so all hospital departments/specialties
    // are available to dropdowns and booking flows.
    if (action === 'speciality') {
      const allDocs = await getCachedOrFetchDrAhis();
      
      let originalSpecs: any[] = [];
      try {
        const specUrl = `${DMH_API_CONFIG.baseUrl}doctorList.php`;
        const specRes = await fetch(specUrl, {
          method: 'POST',
          headers: DMH_API_CONFIG.headers,
          body: JSON.stringify({ action: 'speciality' }),
        });
        if (specRes.ok) {
          const specData = await specRes.json();
          originalSpecs = specData?.specialityJSON || [];
        }
      } catch (err) {
        console.warn('[DMH API] Failed fetching original speciality list, using drAhis fallback:', err);
      }

      const specMap = new Map<string, any>();
      for (const s of originalSpecs) {
        const id = String(s.id || s.speciality_id || '').trim();
        const name = String(s.speciality_name || s.name || '').trim();
        if (id && name) {
          specMap.set(id, { id, speciality_id: id, speciality_name: name });
        }
      }

      for (const d of allDocs) {
        const id = String(d.speciality_id || '').trim();
        const name = String(d.speciality_name || '').trim();
        if (id && name && !specMap.has(id)) {
          specMap.set(id, { id, speciality_id: id, speciality_name: name });
        }
      }

      // If still empty (e.g. DMH API blocked or offline), fallback to prisma.department
      if (specMap.size === 0) {
        try {
          const depts = await prisma.department.findMany({ where: { status: true } });
          for (const dept of depts) {
            specMap.set(dept.id, { id: dept.id, speciality_id: dept.id, speciality_name: dept.name });
          }
        } catch (dbErr) {
          console.error('[DMH API] DB Fallback error for departments:', dbErr);
        }
      }

      const specialityJSON = Array.from(specMap.values()).sort((a, b) => 
        a.speciality_name.localeCompare(b.speciality_name)
      );

      return NextResponse.json({ specialityJSON });
    }

    // ── Special case: drAhis ─────────────────────────────────────────────────
    // Fast in-memory cached handler for hospital doctor directory
    if (action === 'drAhis') {
      const allDocs = await getCachedOrFetchDrAhis();
      return NextResponse.json({ drAhisJSON: allDocs });
    }

    // ── Special case: speciality_doctor ──────────────────────────────────────
    // The backend does NOT support this action natively (returns empty).
    // We call drAhis (which returns ALL doctors with service_point_id & OpdScheduleYN),
    // cache the result for 5 minutes, then filter by speciality_id.
    if (action === 'speciality_doctor') {
      const allDocs = await getCachedOrFetchDrAhis();

      // Filter by speciality_id if provided
      const specId = restParams.speciality_id ? String(restParams.speciality_id) : null;
      const filtered = specId
        ? allDocs.filter((d: any) => String(d.speciality_id) === specId)
        : allDocs;

      // Normalize fields so existing frontend code works:
      // - doctor_code → doctor_id
      // - isApp starts as 'N' and must be checked strictly from opd_day_time API
      const doctorJSON = filtered.map((d: any) => ({
        ...d,
        doctor_id: d.doctor_id || d.doctor_code || '',
        isApp: 'N',
      }));

      console.log(`[DMH API] speciality_doctor (via drAhis) spec=${specId}: ${doctorJSON.length} doctors`);
      return NextResponse.json({ doctorJSON });
    }
    // ────────────────────────────────────────────────────────────────────────

    const endpoint = DMH_API_CONFIG.endpoints[action as keyof typeof DMH_API_CONFIG.endpoints];
    if (!action || !endpoint) {
      return NextResponse.json({ error: 'Invalid or missing action' }, { status: 400 });
    }

    const url = `${DMH_API_CONFIG.baseUrl}${endpoint}`;
    console.log(`[DMH API Request] Calling ${url} with body:`, body);

    const response = await fetch(url, {
      method: 'POST',
      headers: DMH_API_CONFIG.headers,
      body: JSON.stringify(body),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
      console.log(`[DMH API] Success -> ${action}:`, data);
    } catch (e) {
      console.error(`[DMH API] Error parsing JSON for ${action}:`, text);
      return NextResponse.json({ error: 'Invalid JSON response from DMH API', raw: text }, { status: 500 });
    }

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('DMH API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch from DMH API',
        details: error.message,
        cause: error.cause ? String(error.cause) : null
      },
      { status: 500 }
    );
  }
}
