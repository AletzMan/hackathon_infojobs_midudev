"use client";
import { ChatBotIcon, SendMessageIcon } from "@/app/constants";
import { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import styles from "./chat.module.css";

const initConversation = {
  id: uuid(),
  name: "bot",
  message:
    "Hola soy InfoBot, tu asistente virtual y estoy aquí para ayudarte a encontrar tu próximo empleo..",
};
const initUser = {
  id: uuid(),
  name: "user",
  message: "Quiero un empleo de desarrollo",
};

export function ConversationChat({ setMessageState }) {
  const [conversation, setConversation] = useState([
    initConversation,
    initUser,
  ]);
  const [message, setMessage] = useState("");

  const HandlerSendMessage = () => {
    const newMessage = [...conversation];
    const newChatUser = {
      id: uuid(),
      name: "user",
      message: message,
    };
    newMessage.push(newChatUser);
    setConversation(newMessage);
    setMessage("");
  };

  const HandlerChangeMessage = (text) => {
    setMessage(text);
    setMessageState(text);
  };
  //console.log(chatRef.current.scrollHeight);
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
            <ChatBotIcon />
          </div>
          {chat.name === "bot" && <p className={styles.bot}> {chat.message}</p>}
        </div>
      ))}
      <div className={styles.inputContainer}>
        <input
          value={message}
          onChange={(e) => HandlerChangeMessage(e.target.value)}
          className={styles.input}
          placeholder="Escribe tu consulta"
        ></input>
        <button className={styles.inputSend} onClick={HandlerSendMessage}>
          <SendMessageIcon className={styles.inputSendIcon} />
        </button>
      </div>
    </section>
  );
}
