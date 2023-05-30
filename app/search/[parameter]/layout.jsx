import NavigationOffers from "../components/OfferPreview";
import { OffersByProvince } from "../components/OffersByProvince";
import styles from "./search.module.css";

export default async function LayoutParameter({ children, params }) {
  const { parameter } = params;
  console.log(parameter);

  return (
    <main className={styles.main}>
      <span>
        {`Resultados de busqueda para: `}
        <span className={styles.parameter}>
          {decodeURIComponent(parameter)}
        </span>
      </span>
      <OffersByProvince
        parameter={decodeURIComponent(parameter)
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replaceAll(" ", "-")}
      />
      {children}
    </main>
  );
}
