import Image from "next/image";
import SpainMap from "./components/SpainMap/SpainMap";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>Busca empleo en tu ciudad</h2>
      <SpainMap />
    </main>
  );
}
