import { NextResponse } from 'next/server'

const infojobsToken = process.env.INFOJOBS_TOKEN
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN
//const accessToken = 'bbcbabd5-5040-47b8-9990-cc29064d7773'
const API_URL = 'https://api.infojobs.net/api/6/candidate'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('q')
    console.log('TOKEN', code)
    const res = await fetch(API_URL, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infojobsToken}, Bearer ${code}`
        },
    })
    const candidate = await res.json()

    return NextResponse.json({ candidate })
}

