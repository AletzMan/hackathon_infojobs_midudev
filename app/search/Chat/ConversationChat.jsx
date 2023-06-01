"use client"

import { ChatBotIcon, SendMessageIcon } from "@/app/constants"
import { GetOffers } from "@/app/services/infojobsAPI"
import { GetKeyWords } from "@/app/services/openAI"
import {
  CapitalizeFirstLetter,
  GetInitialCapitalLetter,
} from "@/app/utilities/functions"
import Link from "next/link"
import { useEffect, useState } from "react"
import uuid from "react-uuid"
import styles from "./chat.module.css"
const initUser = {
  id: uuid(),
  name: "user",
  message: "Quiero un empleo de desarrollo",
}

export function ConversationChat({
  setMessageState,
  setOpenOffer,
  setSelectedOfferId,
}) {
  const userInfo = window.sessionStorage
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : null
  const initConversation = {
    id: uuid(),
    name: "bot",
    message: `Hola ${
      userInfo?.name ?? "Invitado"
    } soy InfoBot, tu asistente virtual y estoy aquí para ayudarte a encontrar tu próximo empleo, `,
    skills: [],
    offers: null,
  }
  const [conversation, setConversation] = useState([initConversation])
  const [message, setMessage] = useState("")
  const [keyWords, setKeyWords] = useState([])
  const [responseBot, setResponseBot] = useState("")
  const [awaitingResponse, setAwaitingResponse] = useState(false)
  const [offers, setOffers] = useState([])

  const HandlerSendMessage = () => {
    setAwaitingResponse(true)
    const fetchData = async () => {
      const data = await GetKeyWords(message)
      //console.log(JSON.parse(data?.replace(/'/g, '"')))
      //console.log(data)
      const format = data?.replaceAll(/'/g, '"')
      //console.log(format)
      const matchesJSON = format.match(/\{.*?\}/g)
      console.log(matchesJSON)
      const formatJSON = JSON.parse(matchesJSON)
      console.log(formatJSON)
      setKeyWords(formatJSON)
      //const dataResponse = await GetOpenAIResponse(formatJSON)
      //setResponseBot(dataResponse)
    }
    fetchData()
    const newMessage = [...conversation]
    const newChatUser = {
      id: uuid(),
      name: "user",
      message: message,
      skills: [],
      offers: null,
    }
    newMessage.push(newChatUser)
    setConversation(newMessage)
    setMessage("")
  }
  const HandlerButtonSend = () => {
    HandlerSendMessage()
  }
  const HandlerKeySend = (e) => {
    if (e.key === "Enter") {
      HandlerSendMessage()
    }
  }
  const HandlerChangeMessage = (text) => {
    setMessage(text)
    setMessageState(text)
  }

  const HandleOpenViewOffer = (idOffer) => {
    setSelectedOfferId(idOffer)
    setOpenOffer(true)
  }

  useEffect(() => {
    if (conversation.length > 1) {
      setTimeout(() => {
        const dataResponse = `He realizado la búsqueda y aquí están los resultados para tu búsqueda:`
        setResponseBot(dataResponse)
        setAwaitingResponse(false)
      }, 3500)
    }
  }, [keyWords])

  useEffect(() => {
    if (responseBot !== "" && conversation.length > 1) {
      const newResponseBot = responseBot
        .replace("Infobot:", "")
        .replace("infobot:", "")
        .replace("*", "")
      const newMessage = [...conversation]

      const fetchData = async () => {
        const dataOffers = await GetOffers(keyWords)
        setOffers(dataOffers?.product?.items)
        console.log(dataOffers)
        const newBotMessage = {
          id: uuid(),
          name: "bot",
          message: newResponseBot,
          skills: keyWords?.skills,
          offers: dataOffers?.product?.items,
        }
        newMessage.push(newBotMessage)
        setConversation(newMessage)
        setResponseBot("")
      }
      fetchData()
    }
  }, [responseBot])

  /*
  useEffect(() => {
    if (responseBot !== "" && conversation.length > 1) {
      const newResponseBot = responseBot
        .replace("Infobot:", "")
        .replace("infobot:", "")
        .replace("*", "")
      const newMessage = [...conversation]
      const newBotMessage = {
        id: uuid(),responseBot
        name: "bot",
        message: newResponseBot,
        skills: keyWords?.skills,
      }
      newMessage.push(newBotMessage)
      setConversation(newMessage)
      setResponseBot("")
    }
  }, [responseBot])
  */

  console.log(userInfo)
  return (
    <section className={styles.conversation}>
      {conversation?.map((chat) => (
        <div
          key={uuid()}
          className={
            chat.name === "bot"
              ? styles.containerBotChat
              : styles.containerUserChat
          }
        >
          {chat.name !== "bot" && (
            <p className={styles.user}> {chat.message}</p>
          )}
          <div
            className={
              chat.name === "bot"
                ? styles.containerBotChatIcon
                : styles.containerUserChatIcon
            }
          >
            {chat.name === "bot" ? (
              <ChatBotIcon />
            ) : (
              <span
                style={{
                  color: "#1E90FF",
                  fontWeight: "600",
                  textAlign: "center",
                  alignSelf: "center",
                  width: "100%",
                }}
              >
                {(userInfo?.name &&
                  `${GetInitialCapitalLetter(
                    userInfo.name
                  )}${GetInitialCapitalLetter(userInfo.surname1)}`) ||
                  "I"}
              </span>
            )}
          </div>
          {chat.name === "bot" && (
            <div className={styles.bot}>
              <p className={styles.messageBot}>{chat.message}</p>
              {chat.offers && (
                <div className={styles.offersContainer}>
                  {chat?.offers?.map((offer) => (
                    <button
                      key={uuid()}
                      className={styles.offersSkills}
                      title={CapitalizeFirstLetter(offer?.title)}
                      onClick={() => HandleOpenViewOffer(offer?.id)}
                    >
                      {CapitalizeFirstLetter(offer?.title)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <div className={styles.inputContainer}>
        {awaitingResponse && <span className={styles.waitResponse}></span>}
        <input
          value={message}
          onChange={(e) => HandlerChangeMessage(e.target.value)}
          className={styles.input}
          placeholder="Escribe tu consulta"
          onKeyDown={HandlerKeySend}
        ></input>
        <button className={styles.inputSend} onClick={HandlerButtonSend}>
          <SendMessageIcon className={styles.inputSendIcon} />
        </button>
      </div>
    </section>
  )
}
