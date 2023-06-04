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
    const page = searchParams.get('page')
    console.log(query)

    let url = `${API_URL}q=${query.replace("-", ",")}`

    if (province) {
        url += `&city=${province.replace(' ', '-'.toLowerCase())}`
    }

    if (salary) {
        url += `&salary-quantity=${salary}`
    }

    const newURL = url.replace(/,(?=&)/g, ',')

    const res = await fetch(`${newURL}&order=updated-desc&page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infojobsToken}`
        },
    })
    const keyWords = {
        work: query,
        location: province,
        skills: [],
        salary: salary
    }

    //`${newURL}&order=updated-desc&page=${page}`
    const product = await res.json()

    //return NextResponse.json({ product })
    return new Response(JSON.stringify({ product, keyWords, page }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}