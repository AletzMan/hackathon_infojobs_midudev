"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  getAccessToken,
  GetCurriculum,
  GetCurriculumData,
  GetCurriculumExperience,
  GetCurriculumFutureJob,
  GetCurriculumSkills,
} from "../services/infojobsAPI"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

export default function SolicitarTokenPage() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [access, SetAccess] = useState({})
  const router = useRouter()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    const code = searchParams.get("code")

    const getJobs = async () => {
      console.log(code)
      const data = await getAccessToken(code)
      SetAccess(data)
      sessionStorage.setItem("accessToken", JSON.stringify(data))
      setTimeout(() => {
        sessionStorage.setItem("accessToken", null)
      }, 43199000)
      const cv = await GetCurriculum(data?.access_token)
      const userInfo = await GetCurriculumData(
        data?.access_token,
        cv?.curriculum[0]?.code
      )
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo?.curriculum))

      const futureJob = await GetCurriculumFutureJob(
        data?.access_token,
        cv?.curriculum[0]?.code
      )
      sessionStorage.setItem("futureJob", JSON.stringify(futureJob?.futureJob))

      const userExperience = await GetCurriculumExperience(
        data?.access_token,
        cv?.curriculum[0]?.code
      )
      sessionStorage.setItem(
        "userExperience",
        JSON.stringify(userExperience?.experience)
      )

      const userSkills = await GetCurriculumSkills(
        data?.access_token,
        cv?.curriculum[0]?.code
      )
      sessionStorage.setItem("userSkills", JSON.stringify(userSkills?.skills))

      console.log(userInfo)
      router.push(`/?login=OK`)
    }
    getJobs()
  }, [pathname])
  return (
    <div style={{ paddingTop: "5em" }}>
      {(access.error || !access.expires_in) && (
        <>
          <h1 style={{ textAlign: "center", margin: "4em 0 0 0" }}>
            Solicitando token de acceso...
          </h1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "2em",
            }}
          >
            <CircularProgress />
          </Box>
        </>
      )}
      {access.expires_in && (
        <>
          <h1>BIENVENIDO </h1>
          <span>{}</span>
        </>
      )}
    </div>
  )
}
