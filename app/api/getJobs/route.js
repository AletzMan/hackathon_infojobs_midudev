import { NextResponse } from 'next/server'

const infojobsToken = process.env.INFOJOBS_TOKEN
const API_URL = 'https://api.infojobs.net/api/9/offer?'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const page = searchParams.get('p')

    const res = await fetch(`${API_URL}province=${query}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infojobsToken}`
        },
    })
    const product = await res.json()

    return NextResponse.json({ product })
}

