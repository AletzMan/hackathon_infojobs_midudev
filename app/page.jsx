import styles from "./page.module.css"
import { SessionAuth } from "./components/SessionAuth"
import { LoginSection } from "./components/LoginSection"

export default function Home() {
  return (
    <main className={styles.main}>
      <SessionAuth />
      <h1 className={styles.title}>
        ¡Bienvenido a InfoJobs, el camino hacia tu futuro laboral!
      </h1>
      <h2 className={styles.subTitle}>
        Encuentra empleo en el sector que deseas, con las mejores oportunidades
        y empresas destacadas. ¡Comienza hoy mismo!
      </h2>
      <LoginSection />
    </main>
  )
}
