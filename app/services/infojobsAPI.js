const infojobsToken = process.env.INFOJOBS_TOKEN;
const API_URL = 'https://api.infojobs.net/api/9/offer?province='

export async function GetOffers(parameter, page) {
    console.log(`${API_URL}${parameter}&page=${page}`)
    const res = await fetch(`${API_URL}${parameter}&page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${infojobsToken}`
        }
    })
    const data = await res.json()
    return data
}

export async function GetInfoJobsOffers(query, page) {
    const res = await fetch(`/api/getJobs?q=${query}&p=${page}`)

    const data = await res.json()
    return data
}

export async function GetInfoJobsOfferDetails(id) {
    const res = await fetch(`/api/getJobsDetails?id=${id}`)

    const data = await res.json()
    return data
}

export async function GetInfoCandidate(accessToken) {
    const res = await fetch(`/api/getCandidate?q=${accessToken}`)

    const data = await res.json()
    return data
}

export async function GetCurriculum(accessToken) {
    const res = await fetch(`/api/getCurriculum?q=${accessToken}`)

    const data = await res.json()
    return data
}

export async function GetCurriculumData(accessToken, id) {
    const res = await fetch(`/api/getCurriculumData?q=${id}&code=${accessToken}`)

    const data = await res.json()
    return data
}

export async function GetCurriculumFutureJob(accessToken, id) {
    const res = await fetch(`/api/getCurriculumFutureJob?q=${id}&code=${accessToken}`)

    const data = await res.json()
    return data
}

export async function GetCurriculumExperience(accessToken, id) {
    const res = await fetch(`/api/getCurriculumExperience?q=${id}&code=${accessToken}`)

    const data = await res.json()
    return data
}

export async function GetCurriculumSkills(accessToken, id) {
    const res = await fetch(`/api/getCurriculumSkills?q=${id}&code=${accessToken}`)

    const data = await res.json()
    return data
}

export async function getAccessToken(code) {
    const res = await fetch(`/api/token?code=${code}`, {
        method: 'POST',
    })

    const data = await res.json()

    return data
}


