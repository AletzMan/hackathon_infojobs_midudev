import { NextResponse } from 'next/server'

const grantType = "authorization_code"
const tokenEndpoint = 'https://www.infojobs.net/oauth/authorize'
const clientId = '23456f49ebdd416db1a906c5abfb438e'
const clientSecret = process.env.INFOJOBS_SECRET
const redirectUri = "https://hackathon-infojobs-midudev.vercel.app/request-token"

export async function POST(query) {
    const { searchParams } = new URL(query.url)
    const code = searchParams.get('code')
    const res = await fetch(`${tokenEndpoint}?grant_type=${grantType}&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirectUri}`, {
        method: 'POST',
        body: JSON.stringify({ time: new Date().toISOString() }),
    })

    const data = await res.json()

    return NextResponse.json(data)
}