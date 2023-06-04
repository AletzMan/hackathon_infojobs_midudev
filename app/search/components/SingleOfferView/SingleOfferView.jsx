import {
  CircleIcon,
  ClockIcon,
  ExecutiveIcon,
  NewIcon,
  UrgentIcon,
} from "@/app/constants"
import {
  CapitalizeFirstLetter,
  GetElapsedTime,
} from "@/app/utilities/functions"
import { profile } from "@tensorflow/tfjs"
import Image from "next/image"
import styles from "./singleofferview.module.css"
const PATH_IMAGE =
  "https://media.infojobs.net/appgrade/pictures/pic-company-logo.png"

export function SingelOfferView({ offer, isSelected, HandleOpenViewOffer }) {
  const timeDiff = GetElapsedTime(offer.updated)
  let isOfferNew = offer.updated === offer.published

  return (
    <>
      {" "}
      {offer !== undefined && (
        <div
          className={styles.offer}
          title={CapitalizeFirstLetter(offer?.title)}
          onClick={() => HandleOpenViewOffer(offer?.id)}
        >
          <div className={styles.offerOptions}>
            <span className={styles.offerOptionsDate}>
              {" "}
              <ClockIcon />
              {timeDiff}
            </span>
            {isOfferNew && (
              <span className={styles.offerOptionsNew}>
                {<NewIcon />}
                {"Nuevo"}
              </span>
            )}
            {offer.multiProvince && (
              <span className={styles.offerOptionsMultiple}>
                <CircleIcon />
                {"En varias provincias"}
              </span>
            )}
            {offer.urgent && (
              <span className={styles.offerOptionsUrgent}>
                <UrgentIcon />
                {"Urgente"}
              </span>
            )}
            {offer.executive && (
              <span className={styles.offerOptionsExecutive}>
                <ExecutiveIcon />
                {"Executive"}
              </span>
            )}
          </div>
          <h2 className={styles.offerTitle}>
            {CapitalizeFirstLetter(offer?.title)}
          </h2>
          <p className={styles.offerDescription}>
            <span className={styles.offerContract}>
              {offer?.contractType?.value}
            </span>
            <span className={styles.offerJourney}>{offer?.workDay?.value}</span>
            <span className={styles.offerSalary}>
              {offer?.salaryDescription}
            </span>
          </p>
          <p className={styles.offerExperienceContainer}>
            <span className={styles.offerExperienceTitle}>Experiencia: </span>
            <span className={styles.offerExperience}>
              {offer?.experienceMin?.value}
            </span>
          </p>
          <div className={styles.offerCompany}>
            <h3 className={styles.offerCompanyName}>{offer?.author?.name}</h3>
            <span className={styles.offerCompanyLocation}>
              {offer?.province?.value}
            </span>
            <Image
              className={styles.offerCompanyLogo}
              src={offer?.author?.logoUrl || PATH_IMAGE}
              width={35}
              height={35}
              alt={`logo de ${offer?.author?.name}`}
            />
          </div>
        </div>
      )}
    </>
  )
}
