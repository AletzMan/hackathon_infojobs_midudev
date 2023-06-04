"use client"

import {
  ChatBotIcon,
  GetJobsFoundMessage,
  GetJobsNoFoundMessage,
  SendMessageIcon,
} from "@/app/constants"
import { GetOffers } from "@/app/services/infojobsAPI"
import { GetKeyWords } from "@/app/services/openAI"
import { GetInitialCapitalLetter } from "@/app/utilities/functions"
import Link from "next/link"
import { useEffect, useState } from "react"
import uuid from "react-uuid"
import { SingelOfferView } from "../components/SingleOfferView/SingleOfferView"
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
  const [keyWords, setKeyWords] = useState({})
  const [responseBot, setResponseBot] = useState("")
  const [awaitingResponse, setAwaitingResponse] = useState(false)
  const [offers, setOffers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const HandlerSendMessage = () => {
    setAwaitingResponse(true)
    const fetchData = async () => {
      const data = await GetKeyWords(message)
      const format = data?.replaceAll(/'/g, '"')
      const matchesJSON = format.match(/\{.*?\}/g)
      const formatJSON = JSON.parse(matchesJSON)
      setKeyWords(formatJSON)
      //const dataResponse = await GetResponseOpenAI(matchesJSON)
      const dataResponse = "* Empleos"
      if (dataResponse?.includes("*")) {
        let dataOffers = await GetOffers(formatJSON, currentPage)
        setOffers(dataOffers.product)
        const dataResponse = GetJobsFoundMessage(
          dataOffers?.product?.totalResults
        )
        setResponseBot(dataResponse)
      } else if (dataResponse?.error?.type) {
        const dataResponse = dataResponse?.error?.message
        setResponseBot(dataResponse)
      } else {
        setKeyWords(null)
        setResponseBot(dataResponse)
        setAwaitingResponse(false)
      }
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
    if (responseBot !== "" && responseBot !== null && conversation.length > 1) {
      let newResponseBot = responseBot
        .replace("Infobot:", "")
        .replace("InfoBot:", "")
        .replace("infobot:", "")
        .replace("infoBot:", "")
        .replace("Respuesta:", "")
        .replace("Respuest:", "")
        .replace("*", "")
      const newMessage = [...conversation]
      setAwaitingResponse(true)
      const fetchData = async () => {
        if (keyWords !== null) {
          if (offers?.totalResults === 0) {
            newResponseBot = GetJobsNoFoundMessage()
          }
        }
        const newBotMessage = {
          id: uuid(),
          name: "bot",
          message: newResponseBot,
          skills: keyWords?.skills,
          offers: offers?.items,
        }
        newMessage.push(newBotMessage)
        setConversation(newMessage)
        setResponseBot("")
        setAwaitingResponse(false)
      }

      fetchData()
    }
  }, [responseBot])
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
                    <SingelOfferView
                      key={uuid()}
                      HandleOpenViewOffer={() => HandleOpenViewOffer(offer?.id)}
                      offer={offer}
                    />
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
          placeholder="Ingresa un cargo o palabras clave"
          onKeyDown={HandlerKeySend}
        ></input>
        <button className={styles.inputSend} onClick={HandlerButtonSend}>
          <SendMessageIcon className={styles.inputSendIcon} />
        </button>
      </div>
      <div className={styles.containerMoreOffers}>
        {offers?.totalResults > 20 && (
          <Link
            className={styles.moreOffers}
            href={`/search/work=${keyWords?.work}&location=${keyWords?.location}&page=${currentPage}`}
          >
            Ver todas las ofertas
          </Link>
        )}
      </div>
    </section>
  )
}
