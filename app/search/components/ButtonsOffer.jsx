"use client";

import styles from "./offers.module.css";
import {
  CopyLinkIcon,
  FavIcon,
  OptionsIcon,
  PrintIcon,
  ReportIcon,
  ShareIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@/app/constants";
import { useState } from "react";
import Link from "next/link";

export function ButtonsOffer({ detailsOffer }) {
  const [stateButtons, setStateButtons] = useState([false, false, false]);

  const HandlerButtonsState = (button) => {
    if (button === 0)
      setStateButtons((prev) => [!prev[button], prev[1], prev[2]]);
    if (button === 1)
      setStateButtons((prev) => [prev[0], !prev[button], false]);
    if (button === 2)
      setStateButtons((prev) => [prev[0], false, !prev[button]]);
  };

  function CopyClipboardLink(link) {
    navigator.clipboard
      .writeText(link)
      .then(function () {
        console.log("Enlace copiado al portapapeles");
      })
      .catch(function (error) {
        console.error("Error al copiar el enlace al portapapeles:", error);
      });
  }

  return (
    <>
      <section className={styles.buttonsOffer}>
        <button className={styles.buttonApply}>Postularme</button>
        <button
          className={`${styles.buttonFav} ${styles.button} ${
            stateButtons[0] ? styles.buttonFavtrue : styles.buttonFavfalse
          }`}
          onClick={() => HandlerButtonsState(0)}
        >
          <FavIcon />
        </button>
        <button
          className={`${styles.buttonShare} ${styles.button} ${
            stateButtons[1] ? styles.buttonSharetrue : styles.buttonSharefalse
          }`}
          onClick={() => HandlerButtonsState(1)}
        >
          <ShareIcon />
        </button>
        <button
          className={`${styles.buttonOptions} ${styles.button} ${
            stateButtons[2]
              ? styles.buttonOptionstrue
              : styles.buttonOptionsfalse
          }`}
          onClick={() => HandlerButtonsState(2)}
        >
          <OptionsIcon />
        </button>
        {stateButtons[1] && (
          <ul className={styles.shareMenu}>
            <li>
              <button
                className={styles.shareMenuCopy}
                onClick={() => CopyClipboardLink(detailsOffer.link)}
              >
                <CopyLinkIcon /> Copiar enlace
              </button>
            </li>
            <li>
              <Link
                className={styles.shareMenuWhats}
                href={`whatsapp://send?text=${encodeURIComponent(
                  detailsOffer.link
                )}%20${detailsOffer.title}`}
                target="_blank"
              >
                <WhatsAppIcon /> Compartir en WhatsApp
              </Link>
            </li>
            <li>
              <Link
                className={styles.shareMenuTwitter}
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  detailsOffer.link
                )}&text=${detailsOffer.title}`}
                target="_blank"
              >
                <TwitterIcon /> Compartit en Twitter
              </Link>
            </li>
          </ul>
        )}
        {stateButtons[2] && (
          <ul className={styles.optionMenu}>
            <li>
              <button className={styles.optionMenuPrint}>
                <PrintIcon /> Imprimir
              </button>
            </li>
            <li>
              <button className={styles.optionMenuReport}>
                <ReportIcon /> Denunciar empleo
              </button>
            </li>
          </ul>
        )}
      </section>
    </>
  );
}
