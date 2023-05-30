import Image from "next/image"
import Link from "next/link"
import styles from "./page.module.css"
import loginImage from "../assets/login_image.svg"

const scope =
  "MY_APPLICATIONS,CANDIDATE_PROFILE_WITH_EMAIL,CANDIDATE_READ_CURRICULUM_SKILLS,CV,CANDIDATE_READ_CURRICULUM_CVTEXT,CANDIDATE_READ_CURRICULUM_EDUCATION,CANDIDATE_READ_CURRICULUM_PERSONAL_DATA,CANDIDATE_READ_CURRICULUM_FUTURE_JOB,CANDIDATE_READ_CURRICULUM_EXPERIENCE"
const clientId = "23456f49ebdd416db1a906c5abfb438e"
const redirectUri = "http://hackatoninfojobs.com:3000/request-token"
const authorizationUrl = `https://www.infojobs.net/api/oauth/user-authorize/index.xhtml?scope=${scope}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        ¡Bienvenido a InfoJobs, el camino hacia tu futuro laboral!
      </h1>
      <h2 className={styles.subTitle}>
        Encuentra empleo en el sector que deseas, con las mejores oportunidades
        y empresas destacadas. ¡Comienza hoy mismo!
      </h2>
      <Image src={loginImage} width={300} heigth={300} />
      <p className={styles.textLogin}>
        Inicia sesión y descubre una experiencia laboral más personalizada.
        Obtén acceso a funciones exclusivas, postula a empleos de manera ágil y
        mantente al tanto de las últimas oportunidades laborales.{" "}
      </p>
      <Link
        className={styles.buttonLogin}
        href={authorizationUrl}
        as={authorizationUrl}
      >
        Inicio de sesión
      </Link>
    </main>
  )
}
