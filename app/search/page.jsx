import SpainMap from "../components/SpainMap/SpainMap"
import { ChatDrawer } from "./Chat/Chat"
import styles from "./search.module.css"
import React from "react"

export default function SearchPage() {
  return (
    <main className={styles.main}>
      <h3 style={{ margin: "0.5em 0" }}>Busca empleo en tu ciudad</h3>
      <SpainMap />
      <div className={styles.chat}>
        <ChatDrawer />
        <span className={styles.light}></span>
      </div>
    </main>
  )
}
