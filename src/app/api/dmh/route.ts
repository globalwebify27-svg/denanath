import { NextResponse } from 'next/server';
import { DMH_API_CONFIG } from '@/lib/dmhApi';

let cachedDrAhis: { data: any[]; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...restParams } = body;

    // ── Special case: speciality_doctor ──────────────────────────────────────
    // The backend does NOT support this action natively (returns empty).
    // We call drAhis (which returns ALL doctors with service_point_id & OpdScheduleYN),
    // cache the result for 5 minutes, then filter by speciality_id.
    if (action === 'speciality_doctor') {
      const now = Date.now();
      let allDocs: any[] = [];

      if (cachedDrAhis && now - cachedDrAhis.timestamp < CACHE_TTL) {
        allDocs = cachedDrAhis.data;
      } else {
        const drAhisUrl = `${DMH_API_CONFIG.baseUrl}doctorList.php`;
        const drAhisRes = await fetch(drAhisUrl, {
          method: 'POST',
          headers: DMH_API_CONFIG.headers,
          body: JSON.stringify({ action: 'drAhis' }),
        });

        const text = await drAhisRes.text();
        try {
          const parsed = JSON.parse(text);
          allDocs = parsed.drAhisJSON || [];
          cachedDrAhis = { data: allDocs, timestamp: now };
        } catch (e) {
          return NextResponse.json({ error: 'drAhis parse error', raw: text }, { status: 500 });
        }
      }

      // Filter by speciality_id if provided
      const specId = restParams.speciality_id ? String(restParams.speciality_id) : null;
      const filtered = specId
        ? allDocs.filter((d: any) => String(d.speciality_id) === specId)
        : allDocs;

      // Normalize fields so existing frontend code works:
      // - doctor_code → doctor_id
      // - isApp = OpdScheduleYN is Yes AND service_point_id exists (required for check_date/check_slot)
      const doctorJSON = filtered.map((d: any) => ({
        ...d,
        doctor_id: d.doctor_id || d.doctor_code || '',
        isApp: (d.OpdScheduleYN === 'Yes' && d.service_point_id) ? 'Y' : 'N',
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
