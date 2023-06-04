"use client"
import { useEffect, useState } from "react"
import { GetApplications } from "../services/infojobsAPI"
import styles from "./applications.module.css"
import { OfferApplication } from "./components/OfferApplication"

export default function Applications() {
  const [applications, setApplications] = useState({})
  const accessToken =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage?.getItem("accessToken"))
      : null
  useEffect(() => {
    const getCandidate = async () => {
      const data = await GetApplications(accessToken?.access_token)
      setApplications(data)

      if (accessToken) {
      }
    }
    getCandidate()
  }, [])
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Mis Ofertas</h1>
      {applications?.applications &&
        applications?.applications.map((application) => (
          <OfferApplication key={application?.code} offer={application} />
        ))}
    </section>
  )
}
