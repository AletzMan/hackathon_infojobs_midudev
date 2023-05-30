import { ChatBotIcon } from "../constants";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
    });

    return response;
}