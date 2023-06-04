import Image from "next/image"
import styles from "../applications.module.css"
const PATH_IMAGE =
  "https://media.infojobs.net/appgrade/pictures/pic-company-logo.png"
export function OfferApplication({ offer }) {
  let date = new Date(offer?.date) || ""
  console.log(date)
  console.log(offer)
  return (
    <article className={styles.article}>
      <h1 className={styles.offerTitle}>{offer?.jobOffer?.title}</h1>
      <div className={styles.containerCompany}>
        <span className={styles.companyName}>{offer?.jobOffer?.company}</span>
        <span className={styles.companyCity}>{offer?.jobOffer?.city}</span>
      </div>
      <Image
        className={styles.companyLogo}
        src={offer.jobOffer.logoUrl || PATH_IMAGE}
        width={40}
        height={40}
        alt={`logo de ${offer?.jobOffer?.company}`}
      />
      <span className={styles.date}>{date.toLocaleDateString()}</span>
    </article>
  )
}
