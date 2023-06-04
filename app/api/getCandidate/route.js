import { NextResponse } from 'next/server'

const infojobsToken = process.env.INFOJOBS_TOKEN
const API_URL = 'https://api.infojobs.net/api/6/candidate'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('q')

    const res = await fetch(API_URL, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infojobsToken}, Bearer ${code}`
        },
    })
    const candidate = await res.json()

    return NextResponse.json({ candidate })
}

