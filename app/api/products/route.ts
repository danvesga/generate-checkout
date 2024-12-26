import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const externalApiUrl = 'https://prods.garrettladley.com/api/v1/products?categories=office%20supplies';
    const response = await fetch(externalApiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}