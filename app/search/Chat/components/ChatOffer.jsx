import { CapitalizeFirstLetter } from "@/app/utilities/functions"
import { profile } from "@tensorflow/tfjs"
import Image from "next/image"
import styles from "./chatoffer.module.css"
const PATH_IMAGE =
  "https://media.infojobs.net/appgrade/pictures/pic-company-logo.png"

export function ChatOffer({ offer, HandleOpenViewOffer }) {
  return (
    <>
      {" "}
      {offer !== undefined && (
        <div
          className={styles.offer}
          title={CapitalizeFirstLetter(offer?.title)}
          onClick={() => HandleOpenViewOffer(offer?.id)}
        >
          <h2>{CapitalizeFirstLetter(offer?.title)}</h2>
          <p>
            <span>{offer?.contractType?.value}</span>
            <span>{offer?.journey?.value}</span>
            <span>{offer?.salaryDescription}</span>
          </p>
          <p>
            <span>Experiencia: </span>
            {offer?.experienceMin?.value}
          </p>
          <p>
            <h3>{offer?.author?.name}</h3>
            <span>{offer?.province?.value}</span>
          </p>
          <Image
            src={offer?.author?.logoUrl || PATH_IMAGE}
            width={35}
            height={35}
            alt={`logo de ${offer?.author?.name}`}
          />
        </div>
      )}
    </>
  )
}
