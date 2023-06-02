
export async function GetResponseOpenAI(text) {
    try {
        console.log(text)
        const res = await fetch(`/api/getOpenAIResponse?prompt=${text}`)
        const data = await res.json()
        console.log(data)
        return data.data.choices[0].text
    } catch (error) {
        console.error(error)
    }

}













/*
const { Configuration, OpenAIApi } = require("openai")


const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    headers: {
        "Content-Type": "application/json",
        "User-Agent": "",
    }
})
const openai = new OpenAIApi(configuration)

export async function ChatBotResponse(text) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Eres un asistente llamado InfoBot de una pagina de busqueda de empleo llamada InfoJobs, responde las dudas de los usuarios, 
        - Como dato minimo te tendra que proporcionar uno de los siguientes work, location, skills y salary, los otros son opcionales.
        - Te pasaran un formato JSON como el siguiente, tomando en cuanta los puntos anteriores le haces saber al usuario si faltan datos o si realizaras la busqueda.
        {
            "work": "Profesor de Matematicas",
            "skills": ["matematicas"],
            "location": "madrid",
            "salary": "3500"
        }
        - Responda de forma concisa y breve, no demasiado larga, 2 líneas como máximo.
        - Al tener los requisitos minimos de busqueda, di al usuario que realizaras la busquedaa y en breve le proprcionaras los resultados
        - Al responder que buscaras las ofertas, al principio de tu mensaje escribe un *, solo si se hay un dato de los cuatro.
        - El asterisco solo si ahi el usuario proporciono uno de los 4 valores del JSON.
        - No des ofertas, y no digas que no ofreces ofertas.
        - Cualquier otra progunta contesta solo tu nombre o para quien trabajaas, de ahi en fuera decirle que solo estas para ayudarle.
        - Pedirle al usuario algunos de los 4 puntos si no los proporciono.
        - Manten una conversacion de acuerdo a tu posicion.
        
        
        user: ${text}`,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
    })

    return response
}
*/
/*
export async function GetOpenAIResponse(text) {
    const apiKEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Eres un asistente llamado InfoBot de una pagina de busqueda de empleo llamada InfoJobs, responde las dudas de los usuarios, 
                - Como dato minimo te tendra que proporcionar uno de los siguientes work, location, skills y salary, los otros son opcionales.
                - Te pasaran un formato JSON como el siguiente, tomando en cuanta los puntos anteriores le haces saber al usuario si faltan datos o si realizaras la busqueda.
                {
                    "work": "Profesor de Matematicas",
                    "skills": ["matematicas"],
                    "location": "madrid",
                    "salary": "3500"
                }
                - Responda de forma concisa y breve, no demasiado larga, 2 líneas como máximo.
                - Al tener los requisitos minimos de busqueda, di al usuario que realizaras la busquedaa y en breve le proprcionaras los resultados
                - Al responder que buscaras las ofertas, al principio de tu mensaje escribe un *, solo si se hay un dato de los cuatro.
                - El asterisco solo si ahi el usuario proporciono uno de los 4 valores del JSON.
                - No des ofertas, y no digas que no ofreces ofertas.
                - Cualquier otra progunta contesta solo tu nombre o para quien trabajaas, de ahi en fuera decirle que solo estas para ayudarle.
                - Pedirle al usuario algunos de los 4 puntos si no los proporciono.
                - Manten una conversacion de acuerdo a tu posicion.
                
                
                user: ${text}`,
                max_tokens: 60,
                temperature: 0.9,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            }),
        })
        const data = await response.json()
        console.log(data)
        return data.choices[0].text
    } catch (error) {
        console.error(error)
    }
    setMessage("")
    //}

    fetchData()

}
*/


export async function GetKeyWords(text) {
    //const fetchData = async () => {
    const responseUser = text.replace("Respuest: ", "").replace("Respuest:", "").replace("Respuesta:", "")
    try {
        const response = await fetch("https://api.cohere.ai/v1/generate", {
            method: "POST",
            headers: {
                Authorization: "BEARER jsHP6gZTMMXJoWDQQwl1wtEQ22rT2BiV6nZFnX1Q",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "command",
                prompt: `
                
                Del parrafo proporcionado extraeras las palabras clave, y responderas con un formato JSON
                solo responderas el formato JSON
                
                Pregunta: Busco empleos de desarrollo web con react en Guadalajara con salario de 3000 tiempo completo
                Respuest: {"work":"Desarrollo Web","skills":["react","web"],"location":"Guadalara","salary":"3000","contract":"autonomo","workDay":"completa"}
                Pregunta: Qué trabajos de técnico de mantenimiento eléctrico hay disponibles de tiempo parcial no importa horario
                Respuest: {"work":"Tecnico mantenimiento","skills":["eléctrico"],"location":"Guadalara","salary":"3000","contract":"a-tiempo-parcial","workDay":"indiferente"}
                Pregunta: Empleos de Ingeniero electrico experiencia en autocad, diagramas en barcelona solo por un tiempo
                Respuest: {"work":"Ingeniero electrico","skills":["autocad","diagramas"],"location":"barcelona","salary":"","contract":"de-duracion-determinada","workDay":""}
                Pregunta: Operador de produccion habilidad manual salario de 2500 por temporada solo de mañana
                Respuest: {"work":"Operador de produccion","skills":["manual"],"location":'',"salary":"2500","contract":"de-duracion-determinada","workDay":"parcial-manana"} 
                Pregunta: quiero un empleo de diseñador experiencia en photoshop en guadalajara por la tarde
                Respuest: {"work":"diseñador","skills":["photoshop"],"location":'guadalajara',"salary":"","contract":"","workDay":"parcial-tarde"} 
                Pregunta: ${responseUser}`,
                max_tokens: 150,
                temperature: 0.9,
                k: 0,
                stop_sequences: [],
                return_likelihoods: "NONE",
            }),
        })
        const data = await response.json()
        return data.generations[0].text
    } catch (error) {
        console.error(error)
    }
    setMessage("")
    //}

    fetchData()

}