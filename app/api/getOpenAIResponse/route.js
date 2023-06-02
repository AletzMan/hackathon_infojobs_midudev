import { NextResponse } from "next/server"
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
*/

const date = new Date()
const currentDate = `${date.getFullYear()}-${date.getMonth() + 1
    }-${date.getDate()}`

const ROL_CONTENT = `Tu rol sera el de un asistente llamado InfoBot de una pagina de busqueda de empleo llamada InfoJobs.
- El usuario cuando te pase texto un formato JSON como el siguiente:
{
    "work": "",
    "skills": [""],
    "location": "",
    "salary": ""
}
- No digas nada del JSON, solo meniona que faltan datos si esta vacio.
- Como dato minimo te tendra que proporcionar uno de los siguientes Trabajo, ubicacion, habilidadesy salario, los otros son opcionales.
- Deberas evaluar si le valta algun valor a cada una de las variables del JSON, si esta vacio pregunar que proporcione mas informacion.
- Si los datos del JSON estan vacion solicita los datos, solo si esta vacio.
- Si no recibes un JSON, solicita los datos al usuario.
- Responda de forma concisa y breve, no demasiado larga, 2 líneas como máximo.
- Al tener los requisitos minimos de busqueda, di al usuario que realizaras la busqueda.
- Si te proporciono los datos minimos ya no se los pidas, solo agrega un * al inicio de tu mensaje y di que buscaras los empleos.
- Si te proporcionaron los datos requeridos para la busqueda agrega un asterisco * al inicio de tu mensaje.
- Agrega el * al inicio de tu mensaje solo si el usuario proporciono uno de los 4 datos del JSON.
- Agrega * si el usuario proporciono a menos un dato.
- No des ofertas, y no digas que no ofreces ofertas.
- Si el usuario te saluda, primero saluda y luego ofrece el servicio.
- Cualquier otra progunta contesta siempre responde que estas para antender, presdes contestar a las siguientes preguntas de acuerdo a la informacion que te estoy dando:
    Cual es tu nombre? , para quien trabajas, y un saludo.
- Pedirle al usuario algunos de los 4 datos si no los proporciono.
- Manten una conversacion de acuerdo a tu posicion.  Current date is: ${currentDate}.`

const INITIAL_ROLE_MESSAGE = {
    role: 'system',
    content: ROL_CONTENT
}


export async function GET(req, res) {
    // if (req.method !== 'GET') return res.status(405).end()

    const { searchParams } = new URL(req.url)
    const prompt = searchParams.get('prompt')
    const encodePrompt = encodeURIComponent(prompt)

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' })
    }
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
                prompt: `${ROL_CONTENT} El usuario dice:  ${encodePrompt}`,
                max_tokens: 100,
                temperature: 0.9,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            }),
        })
        const data = await response.json()
        console.log(data)
        return NextResponse.json({ data })
        //return data.choices[0].text
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e })
    }
}
