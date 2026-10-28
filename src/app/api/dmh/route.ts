import { NextResponse } from 'next/server';
import { DMH_API_CONFIG } from '@/lib/dmhApi';
import { prisma } from '@/lib/prisma';

// Helper to extract AppTrana Incident details if blocked
function extractAppTranaDetails(html: string): { incidentId: string | null; ip: string | null; time: string | null } {
  const incidentMatch = html.match(/<td><strong>ID<\/strong><\/td>\s*<td>([a-f0-9]{32})<\/td>/i) ||
                        html.match(/Incident\s*ID\s*:\s*([a-f0-9]{32})/i) ||
                        html.match(/([a-f0-9]{32})/i);
  const ipMatch = html.match(/<td><strong>IP<\/strong><\/td>\s*<td>([0-9a-f.:]+)<\/td>/i);
  const timeMatch = html.match(/<td><strong>Time<\/strong><\/td>\s*<td>([^<]+)<\/td>/i);
  return {
    incidentId: incidentMatch ? incidentMatch[1] : null,
    ip: ipMatch ? ipMatch[1].trim() : null,
    time: timeMatch ? timeMatch[1].trim() : null,
  };
}

// GET /api/dmh - Live diagnostic endpoint to test DMH API connectivity
export async function GET() {
  const testUrl = `${DMH_API_CONFIG.baseUrl}doctorList.php`;
  try {
    // Also check server's true outbound IP
    let serverOutboundIp: string | null = null;
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) });
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        serverOutboundIp = ipData.ip;
      }
    } catch {}

    const res = await fetch(testUrl, {
      method: 'POST',
      headers: DMH_API_CONFIG.headers,
      body: JSON.stringify({ action: 'speciality' }),
    });
    const text = await res.text();
    const isBlocked = res.status === 406 || text.includes('Not Acceptable') || text.includes('suspicious behavior');
    const appTrana = isBlocked ? extractAppTranaDetails(text) : { incidentId: null, ip: null, time: null };

    let parsed: any = null;
    try {
      parsed = JSON.parse(text);
    } catch {}

    return NextResponse.json({
      status: res.status,
      statusText: res.statusText,
      blockedByAppTrana: isBlocked,
      appTranaIncidentId: appTrana.incidentId,
      appTranaDetectedIP: appTrana.ip,
      serverOutboundIp: serverOutboundIp,
      success: res.status === 200 && !isBlocked && !!parsed?.specialityJSON,
      specialityCount: parsed?.specialityJSON?.length || 0,
      headersSent: {
        'User-Agent': DMH_API_CONFIG.headers['User-Agent'],
        'Referer': (DMH_API_CONFIG.headers as any)['Referer'],
        'Origin': (DMH_API_CONFIG.headers as any)['Origin'],
        'Content-Type': DMH_API_CONFIG.headers['Content-Type'],
      },
      appTranaDetails: appTrana,
      responsePreview: text.substring(0, 1500),
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 'FETCH_ERROR',
      error: err.message,
      cause: err.cause ? String(err.cause) : null,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

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
      const isBlocked = response.status === 406 || text.includes('Not Acceptable') || text.includes('suspicious behavior');
      const details = isBlocked ? extractAppTranaDetails(text) : { incidentId: null, ip: null, time: null };
      return NextResponse.json({
        error: isBlocked
          ? `Blocked by AppTrana WAF (HTTP 406). Incident ID: ${details.incidentId || 'Unknown'} (Detected IP: ${details.ip || 'Unknown'})`
          : 'Invalid JSON response from DMH API',
        blockedByAppTrana: isBlocked,
        appTranaIncidentId: details.incidentId,
        appTranaDetectedIP: details.ip,
        httpStatus: response.status,
        raw: text.substring(0, 1000),
      }, { status: response.status === 406 ? 406 : 500 });
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
