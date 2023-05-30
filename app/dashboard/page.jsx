"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EMailIcon, LocationIcon, PhoneIcon } from "../constants";
import {
  GetCurriculum,
  GetCurriculumData,
  GetCurriculumExperience,
  GetCurriculumFutureJob,
  GetCurriculumSkills,
  GetInfoCandidate,
} from "../services/infojobsAPI";
import { CalculateAge, CapitalizeFirstLetter } from "../utilities/functions";
import styles from "./dashboard.module.css";
import uuid from "react-uuid";

export default function Dashboard() {
  const [candidate, setCandidate] = useState({});
  const [curriculum, setCurriculum] = useState({});
  const [futureJob, setFutureJob] = useState({});
  const [experience, setExperience] = useState({});
  const [skills, setSkills] = useState({});
  useEffect(() => {
    const getCandidate = async () => {
      const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
      const data = await GetInfoCandidate(accessToken.access_token);
      const cv = await GetCurriculum(accessToken.access_token);

      const dataCV = await GetCurriculumData(
        accessToken.access_token,
        cv?.curriculum[0].code
      );

      const dataFB = await GetCurriculumFutureJob(
        accessToken.access_token,
        cv?.curriculum[0].code
      );

      const dataEX = await GetCurriculumExperience(
        accessToken.access_token,
        cv?.curriculum[0].code
      );

      const dataSkills = await GetCurriculumSkills(
        accessToken.access_token,
        cv?.curriculum[0].code
      );
      setCandidate(data?.candidate);
      setCurriculum(dataCV?.curriculum);
      setFutureJob(dataFB?.futureJob);
      setExperience(dataEX?.experience.experience);
      setSkills(dataSkills?.skills);
    };
    getCandidate();
  }, []);

  console.log(skills);
  return (
    <>
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
  );
}
