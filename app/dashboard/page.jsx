"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { EMailIcon, LocationIcon, PhoneIcon } from "../constants"
import { GetInfoCandidate } from "../services/infojobsAPI"
import { CalculateAge, CapitalizeFirstLetter } from "../utilities/functions"
import styles from "./dashboard.module.css"
import uuid from "react-uuid"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import Link from "next/link"

const scope =
  "MY_APPLICATIONS,CANDIDATE_PROFILE_WITH_EMAIL,CANDIDATE_READ_CURRICULUM_SKILLS,CV,CANDIDATE_READ_CURRICULUM_CVTEXT,CANDIDATE_READ_CURRICULUM_EDUCATION,CANDIDATE_READ_CURRICULUM_PERSONAL_DATA,CANDIDATE_READ_CURRICULUM_FUTURE_JOB,CANDIDATE_READ_CURRICULUM_EXPERIENCE"
const clientId = "23456f49ebdd416db1a906c5abfb438e"
const redirectUri = "http://hackatoninfojobs.com:3000/request-token"
const authorizationUrl = `https://www.infojobs.net/api/oauth/user-authorize/index.xhtml?scope=${scope}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`

export default function Dashboard() {
  const [candidate, setCandidate] = useState({})
  const [curriculum, setCurriculum] = useState({})
  const [futureJob, setFutureJob] = useState({})
  const [experience, setExperience] = useState({})
  const [skills, setSkills] = useState({})
  const accessToken = JSON.parse(sessionStorage.getItem("accessToken"))
  useEffect(() => {
    const getCandidate = async () => {
      const data = await GetInfoCandidate(accessToken?.access_token)
      //const cv = await GetCurriculum(accessToken?.access_token)

      if (accessToken) {
        /*const dataCV = await GetCurriculumData(
          accessToken.access_token,
          cv?.curriculum[0].code
        )

        const dataFB = await GetCurriculumFutureJob(
          accessToken.access_token,
          cv?.curriculum[0].code
        )

        const dataEX = await GetCurriculumExperience(
          accessToken.access_token,
          cv?.curriculum[0].code
        )

        const dataSkills = await GetCurriculumSkills(
          accessToken.access_token,
          cv?.curriculum[0].code
        )*/
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        const futureJob = JSON.parse(sessionStorage.getItem("futureJob"))
        const userExperience = JSON.parse(
          sessionStorage.getItem("userExperience")
        )
        const userSkills = JSON.parse(sessionStorage.getItem("userSkills"))

        setCandidate(data?.candidate)
        setCurriculum(userInfo)
        setFutureJob(futureJob)
        setExperience(userExperience.experience)
        setSkills(userSkills)
      }
    }
    getCandidate()
  }, [])

  return (
    <>
      {!skills?.expertise && (
        <div
          style={{
            position: "absolute",
            top: "5em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
          }}
        >
          {accessToken && (
            <span
              style={{
                fontSize: "2.5em",
                fontWeight: "bold",
                textAlign: "center",
                backgroundColor: "#45cd3225",
                padding: "0.1em 0.5em",
                borderRadius: "0.8em",
                marginTop: "5em",
              }}
            >
              CARGANDO
            </span>
          )}
          <Backdrop
            sx={{ color: "#fff", zIndex: 1 }}
            style={{ display: "flex", flexDirection: "column" }}
            open={true}
          >
            {accessToken && <CircularProgress color="primary" />}
            {!accessToken && (
              <>
                <p
                  style={{
                    maxWidth: "35em",
                    textAlign: "center",
                    margin: "0 0 1.5em 0",
                  }}
                >
                  Inicia sesión y descubre una experiencia laboral más
                  personalizada. Obtén acceso a funciones exclusivas, postula a
                  empleos de manera ágil y mantente al tanto de las últimas
                  oportunidades laborales.
                </p>
                <Link
                  style={{
                    backgroundColor: "var(--Primary)",
                    padding: "0.7em 1em",
                    textDecoration: "none",
                    borderRadius: "0.4em",
                    fontWeight: "500",
                    color: "white",
                  }}
                  href={authorizationUrl}
                  as={authorizationUrl}
                >
                  Inicio de sesión
                </Link>
              </>
            )}
          </Backdrop>
        </div>
      )}
      {candidate.id > 0 && (
        <>
          <h1 className={styles.title}>Mi currículum</h1>
          <section className={styles.section}>
            <div className={styles.containerUser}>
              <Image
                className={`${styles.photoProfile} ${
                  futureJob?.employmentStatus ===
                  "estoy-buscando-trabajo-activamente"
                    ? styles.photoProfileactive
                    : futureJob?.employmentStatus ===
                      "no-busco-trabajo-pero-estoy-dispuesto-a-escuchar-ofertas"
                    ? styles.photoProfilemiddle
                    : styles.photoProfileinactive
                }`}
                src={
                  candidate.hasPhoto
                    ? candidate?.photo
                    : "https://media.infojobs.net/app/pictures/pic-view-cv-default-photo.png"
                }
                width={120}
                height={120}
                alt={`foto de perfil de ${candidate?.name}`}
              />
              <h2
                className={styles.name}
              >{`${candidate?.name} ${candidate?.surname1} ${candidate?.surname2}`}</h2>
              <span>{`${CapitalizeFirstLetter(
                curriculum.gender
              )} · ${CalculateAge(curriculum.birthDay)}`}</span>
              <div className={styles.location}>
                <LocationIcon />
                <span>{`${candidate?.city}, ${candidate?.province?.value}`}</span>
              </div>
            </div>
            <div className={styles.containerContact}>
              <h3>Datos de contacto</h3>
              <div className={styles.email}>
                <EMailIcon />
                <span>{candidate?.email}</span>
              </div>

              <div className={styles.phone}>
                <PhoneIcon />
                <span>{curriculum?.internationalPhone}</span>
              </div>
            </div>
            <div className={styles.futureJob}>
              <h3 className={styles.futureJobTitle}>¿Qué trabajo buscas?</h3>
              <div className={styles.subcategoryFutureOne}>
                <h4 className={styles.subcategoryTitle}>Puesto</h4>
                <span className={styles.subcategoryInfo}>
                  {futureJob?.preferredPosition}
                </span>
              </div>
              <div className={styles.subcategoryFutureTwo}>
                <h4 className={styles.subcategoryTitle}>Salario</h4>
                <span className={styles.subcategoryInfo}>
                  {`€ ${futureJob?.preferredSalary}`}
                </span>
              </div>
              <div className={styles.subcategoryFutureThree}>
                <h4 className={styles.subcategoryTitle}>Subcategorías</h4>

                {futureJob?.subcategories?.map((category) => (
                  <span key={uuid()} className={styles.subcategoryPosition}>
                    {`${CapitalizeFirstLetter(category)}`}
                  </span>
                ))}
              </div>
              <div className={styles.subcategory}>
                <h4 className={styles.subcategoryTitle}>
                  Disponibilidad para cambiar de residencia
                </h4>
                <span className={styles.subcategoryInfo}>
                  {`${CapitalizeFirstLetter(
                    futureJob?.availabilityToChangeHomeAddress
                  )}`}
                </span>
              </div>
              <div className={styles.subcategory}>
                <h4 className={styles.subcategoryTitle}>
                  Disponibilidad para viajar
                </h4>
                <span className={styles.subcategoryInfo}>
                  {`${CapitalizeFirstLetter(futureJob?.availabilityToTravel)}`}
                </span>
              </div>
            </div>
            <div className={styles.experiences}>
              <h3 className={styles.experiencesTitle}>
                Experiencia profesional
              </h3>
              {experience.length > 0 &&
                experience?.map((work) => (
                  <div key={uuid()} className={styles.experience}>
                    <h3
                      className={styles.experiencesName}
                    >{`${work?.job} en ${work?.company}`}</h3>
                    <span className={styles.experiencesDate}>
                      {`${CapitalizeFirstLetter(
                        new Date(work?.startingDate).toLocaleDateString(
                          "es-ES",
                          {
                            month: "long",
                            year: "numeric",
                          }
                        )
                      )} - 
                    ${CapitalizeFirstLetter(
                      new Date(work?.finishingDate).toLocaleDateString(
                        "es-ES",
                        { month: "long", year: "numeric" }
                      )
                    )}`}
                    </span>
                    <p className={styles.experiencesDescription}>
                      {work?.description}
                    </p>
                    <div className={styles.experiencesExpertise}>
                      {work?.expertise?.map((skill) => (
                        <span className={styles.experiencesSkill} key={uuid()}>
                          {skill?.skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.skills}>
              <h3 className={styles.skillsTitle}>
                Conocimientos y habilidades
              </h3>
              <div className={styles.containerSkills}>
                {skills?.expertise?.map((skill) => (
                  <span className={styles.skill} key={uuid()}>
                    {skill.skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}
