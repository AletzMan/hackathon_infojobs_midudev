import React from "react"
import { OffersByProvince } from "../components/OffersByProvince"
import styles from "./search.module.css"

export default async function LayoutParameter({ children, params }) {
  const { parameter } = params
  console.log(parameter)

  return (
    <main className={styles.main}>
      <OffersByProvince
        parameter={decodeURIComponent(parameter)
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replaceAll(" ", "-")}
      />
      {children}
    </main>
  )
}
