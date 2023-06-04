"use client"
import { ArrayProvinces, provinces } from "@/app/constants"
import { GetInfoJobsOffers } from "@/app/services/infojobsAPI"
import { RemoveTilde } from "@/app/utilities/functions"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "./spainmap.module.css"

export default function SpainMap() {
  const [jobsByProvince, setJobsByProvince] = useState([])
  const [nameProvince, setNameProvince] = useState("Elija una ciudad del mapa")
  const HandlerMouseHover = (province) => {
    setNameProvince(province)
  }

  useEffect(() => {
    let ArrayJobs = sessionStorage.getItem("JobsByProvince")
    if (!ArrayJobs) {
      const fetchData = async () => {
        const promises = ArrayProvinces.map(async (province) => {
          const data = await GetInfoJobsOffers(province.key)
          return {
            name: province.value,
            numJobs: data?.product?.totalResults,
          }
        })
        const responseProvinces = await Promise.all(promises)
        console.log(responseProvinces)
        const text = JSON.stringify(responseProvinces)
        sessionStorage.setItem("JobsByProvince", text)
        console.log(text)
        setJobsByProvince(responseProvinces)
      }
      fetchData()
    } else {
      console.log(ArrayJobs)
      setJobsByProvince(JSON.parse(ArrayJobs))
      console.log(JSON.parse(ArrayJobs))
    }
  }, [])

  return (
    <article className={styles.article}>
      <label className={styles.label}>{nameProvince}</label>
      <div className={styles.containerJobs}>
        <div className={styles.jobsTitle}>Numero de empleos:</div>
        <div className={styles.jobsNumber}>
          {jobsByProvince.find((job) =>
            RemoveTilde(job?.name)?.includes(RemoveTilde(nameProvince))
          )?.numJobs || "0"}
        </div>
      </div>
      <svg width="418.45123" height="468.63733" stroke="white">
        {provinces.map((province) => (
          <Link
            key={province.id}
            href={`/search/[parameter]`}
            as={`/search/location=${province.name}&work=&page=1`}
            onMouseEnter={() => HandlerMouseHover(province.name)}
            onMouseLeave={() => HandlerMouseHover("Elija una ciudad del mapa")}
          >
            <path
              key={province.id}
              d={province.drawn}
              className={styles.province}
            />
          </Link>
        ))}
      </svg>
    </article>
  )
}
