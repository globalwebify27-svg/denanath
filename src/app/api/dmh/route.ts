import { NextResponse } from 'next/server';
import { DMH_API_CONFIG } from '@/lib/dmhApi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // The client should send the action and any other required params in the body
    const { action, ...restParams } = body;

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
