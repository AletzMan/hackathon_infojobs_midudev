
const { Configuration, OpenAIApi } = require("openai")


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function ChatBot() {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "The following is a conversation with an AI assistant from a job search company. The assistant is helpful, creative, intelligent, and very friendly. I would like to cancel my subscription, the Human will ask for a job of your interest, and the data you provide will be returned to you in a json, with a job category, salary request, or some other data you provide about the job you are looking for.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I need to look for a web development job.\nAI:",
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
    })

    return response
}


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
                prompt: `Eres un asistente llamado InfoBot de una pagina de busqueda de empleo llamada InfoJobs, responde las dudas de los usuarios, siempre que te pregunte por una oferta, te pasaran un formato como el siguiente, tomando en cuanta los puntos siguientes:
                - Como dato minimo tendra que tener el work y location, o skills y location, los otros 2 son opcionales.
                - Responda de forma concisa y breve, no demasiado larga, 2 líneas como máximo.
                - El salario y las skills, son opcionales.
                - Al tener los requisitos minimos de busqueda, di al usuario que realizaras la busquedaa y en breve le proprcionaras los resultados
                - Al responder que buscaras las ofertas, al principio de tu mensaje escribe un *
                - No des ofertas, y no digas que no ofreces ofertas.
                user: {
                    "work": "Profesor de Matematicas",
                    "skills": ["matematicas"],
                    "location": "madrid",
                    "salary": "3500"
                }
                infobot: Responderas que esperes mientras haces la busqueda amablemente.
                user: {
                    "work": "",
                    "skills": [""],
                    "location": "",
                    "salary": ""
                }
                infobot: Responderas que falta informacion
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
                prompt: `Del parrafo proporcionado extraeras las palabras clave, y responderas con un formato JSON
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