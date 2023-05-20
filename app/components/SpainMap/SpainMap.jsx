"use client";
import { provinces } from "@/app/constants";
import Link from "next/link";
import { useState } from "react";
import styles from "./spainmap.module.css";

export default function SpainMap() {
  const [nameProvince, setNameProvince] = useState("");
  const HandlerMouseHover = (province) => {
    setNameProvince(province);
  };
  return (
    <article className={styles.article}>
      <label className={styles.label}>{nameProvince}</label>
      <svg width="418.45123" height="468.63733" stroke="white">
        {provinces.map((province) => (
          <Link
            href={`/${province.name}`}
            onMouseEnter={() => HandlerMouseHover(province.name)}
            onMouseLeave={() => HandlerMouseHover("")}
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
