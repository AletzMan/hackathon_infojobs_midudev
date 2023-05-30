"use client";
import { provinces } from "@/app/constants";
import Link from "next/link";
import { useState } from "react";
import styles from "./spainmap.module.css";

export default function SpainMap() {
  const [nameProvince, setNameProvince] = useState("Elija una ciudad del mapa");
  const HandlerMouseHover = (province) => {
    setNameProvince(province);
  };

  return (
    <article className={styles.article}>
      <label className={styles.label}>{nameProvince}</label>
      <svg width="418.45123" height="468.63733" stroke="white">
        {provinces.map((province) => (
          <Link
            key={province.id}
            href={`/search/[parameter]`}
            as={`/search/${province.name}`}
            onMouseEnter={() => HandlerMouseHover(province.name)}
            onMouseLeave={() => HandlerMouseHover("Elija una ciudad del mapa")}
          >
            <path
              key={province.id}
              d={province.drawn}
              className={styles.province}
            />
          </Link>
        ))}
      </svg>
    </article>
  );
}
