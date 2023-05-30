"use client";
import { GetElapsedTime } from "@/app/utilities/functions";
import Image from "next/image";
import styles from "./offers.module.css";
const PATH_IMAGE =
  "https://media.infojobs.net/appgrade/pictures/pic-company-logo.png";

export default function OfferPreview({ Job, isSelected, onClick }) {
  const timeDiff = GetElapsedTime(Job.updated);

  let isOfferNew = Job.updated === Job.published;

  return (
    <article
      className={`${styles.job} ${
        isSelected ? styles.jobtrue : styles.jobfalse
      }`}
      onClick={onClick}
    >
      <h2 className={styles.namejob}>{Job.title.replaceAll(",", ", ")}</h2>
      <h3 className={styles.company}>{Job.author.name}</h3>
      <span className={styles.province}>{Job.province.value}</span>
      <span className={styles.date}>{timeDiff}</span>
      <Image
        className={styles.logocompany}
        alt={Job.author.name}
        src={Job.author.logoUrl || PATH_IMAGE}
        width={50}
        height={50}
      />
      {Job.multiProvince && (
        <span className={styles.multiprovince}>
          Buscan en varias provincias
        </span>
      )}
      {isOfferNew && <span className={styles.isnew}>Nueva</span>}
      {!isOfferNew && (
        <span className={styles.republished}>Publicada de nuevo</span>
      )}
      {Job.executive && <span className={styles.executive}>Executive</span>}
      <div className={styles.workdescription}>
        <span
          className={styles.contract}
        >{`Contrato ${Job.contractType.value.toLowerCase()}`}</span>
        <span
          className={styles.workday}
        >{`Jornada ${Job.workDay.value.toLowerCase()}`}</span>
        <span className={styles.salary}>{Job.salaryDescription}</span>
      </div>

      <p className={styles.requirement}>
        <span className={styles.experience}>Experiencia: </span>
        {Job.experienceMin.value}
      </p>
      {!Job.urgent && <span className={styles.urgent}>Se precisa urgente</span>}
    </article>
  );
}
