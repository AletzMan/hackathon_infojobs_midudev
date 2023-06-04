

const infojobsToken = process.env.INFOJOBS_TOKEN
const API_URL = 'https://api.infojobs.net/api/9/offer?'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const province = searchParams.get('p')
    const salary = searchParams.get('s')
    const page = searchParams.get('page')

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

    const product = await res.json()
    return new Response(JSON.stringify({ product, keyWords, page }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}