"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getAccessToken } from "../services/infojobsAPI"

export default function SolicitarTokenPage() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [access, SetAccess] = useState({})

  useEffect(() => {
    const url = pathname + searchParams.toString()
    const code = searchParams.get("code")

    const getJobs = async () => {
      console.log(code)
      const data = await getAccessToken(code)
      SetAccess(data)
      sessionStorage.setItem("accessToken", JSON.stringify(data))
      console.log(data)
    }
    getJobs()
  }, [pathname])
  return (
    <div style={{ paddingTop: "5em" }}>
      {(access.error || !access.expires_in) && (
        <h1>Solicitando token de acceso...</h1>
      )}
      {access.expires_in && (
        <>
          <h1>BIENVENIDO </h1>
          <button>OBTENER TOKEN</button>
          <span>{}</span>
        </>
      )}
    </div>
  )
}
