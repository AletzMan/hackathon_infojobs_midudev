import { NextResponse } from 'next/server'

const infojobsToken = process.env.INFOJOBS_TOKEN
const API_URL = 'https://api.infojobs.net/api/9/offer?'
/*
export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const province = searchParams.get('p')
    const salary = searchParams.get('s')
   
    const res = await fetch(`${API_URL}q=${encodeURIComponent(query)}&city=${province}&salary-quantity=${salary}`.replace(/%2C(?=&)/g, ''), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infojobsToken}`
        },
    })
    const product = await res.json()

    return NextResponse.json({ product })
}

*/

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const province = searchParams.get('p')
    const salary = searchParams.get('s')
    console.log(query)

    let url = `${API_URL}q=${query}`

    if (province) {
        url += `&city=${province}`
    }

    if (salary) {
        url += `&salary-quantity=${salary}`
    }
    console.log(url)
    const newURL = url.replace(/,(?=&)/g, ',')
    console.log(newURL)
    const res = await fetch(newURL, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infojobsToken}`
        },
    })

    const product = await res.json()

    return NextResponse.json({ product })
}