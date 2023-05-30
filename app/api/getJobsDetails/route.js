import { NextResponse } from 'next/server';

const infojobsToken = process.env.INFOJOBS_TOKEN;
const API_URL_OFFER = 'https://api.infojobs.net/api/7/offer/'

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const res = await fetch(`${API_URL_OFFER}${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infojobsToken}`
        },
    });
    const details = await res.json();

    return NextResponse.json({ details });
}