import { NextResponse } from 'next/server'

const infojobsToken = process.env.INFOJOBS_TOKEN

const API_URL = 'https://api.infojobs.net/api/5/application'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('q')
    const code = searchParams.get('code')
    console.log('TOKEN', code)
    const res = await fetch(`${API_URL}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infojobsToken}, Bearer ${code}`
        },
    })
    const applications = await res.json()

    return NextResponse.json({ applications })
}