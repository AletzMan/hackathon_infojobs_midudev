
export const GetElapsedTime = (dateString) => {
    let targetDate = new Date(dateString)
    // Obtener la fecha y hora actual en formato local
    let currentDate = new Date()
    let time = ''
    // Calcular la diferencia en milisegundos entre las dos fechas
    let timeDiff = currentDate.getTime() - targetDate.getTime()

    // Calcular los componentes de tiempo transcurrido
    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)



    if (days > 0) {
        time = `Hace ${days} dias`
    } else if (days == 0 && hours > 0) {
        time = `Hace ${hours} horas`
    } else {
        time = `Hace ${minutes} minutos`
    }

    return time
}

export function ConvertLineBreaks(text) {
    var textHTML = text.replace(/\r?\n/g, "<br>")
    return textHTML
}

export function CapitalizeFirstLetter(text) {

    return text?.charAt(0).toUpperCase() + text?.slice(1)

}

export function CalculateAge(dateOfBirth) {
    if (dateOfBirth != undefined) {
        console.log("birth", dateOfBirth)
        const currentDate = new Date()
        const birth = new Date(dateOfBirth)
        let age = currentDate.getFullYear() - birth.getFullYear()

        const currentMonth = currentDate.getMonth()
        const currentDay = currentDate.getDate()
        const birthMonth = birth.getMonth()
        const birthDay = birth.getDate()

        if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
            age--
        }

        return age
    } else {
        return 'Age'
    }
}

export function ShareLinkTwitter(url, text) {
    var encodeText = encodeURIComponent(text)
    var urlShare = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) + "&text=" + encodeText
    window.open(urlShare, "_blank")
}


