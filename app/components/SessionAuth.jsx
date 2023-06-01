"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "./session.module.css"

export function SessionAuth() {
  //const session = JSON.parse(sessionStorage.getItem("accessToken"))
  const [sessionTime, setSessionTime] = useState(0)
  const router = useRouter()

  useEffect(() => {}, [])
  return (
    <>
      <span className={styles.counter}>{sessionTime}</span>
    </>
  )
}
