"use client";
import styles from "./offers.module.css";
import Image from "next/image";
const PATH_IMAGE =
  "https://media.infojobs.net/appgrade/pictures/pic-company-logo.png";
import imagesearch from "../../../assets/content-card-buscar.svg";
import { GetInfoJobsOfferDetails } from "@/app/services/infojobsAPI";
import { useEffect, useState } from "react";
import { ButtonsOffer } from "./ButtonsOffer";
import uuid from "react-uuid";
import { ConvertLineBreaks } from "@/app/utilities/functions";

export function OfferView({ offerSelected }) {
  const [offers, setOffers] = useState({});

  useEffect(() => {
    const getJobs = async () => {
      const data = await GetInfoJobsOfferDetails(offerSelected);
      setOffers(data);
    };
    getJobs();
  }, [offerSelected]);

  //console.log(offers?.details?.minRequirements);

  return (
    <>
      {offerSelected === null && (
        <>
          <h4>Ofertas de acuerdo a tu búsqueda</h4>
          <p>Selecciona una de la lista para ver su información.</p>
          <Image
            className={styles.imagesearch}
            src={imagesearch}
            width={600}
            height={330}
            alt="resultados de busqueda"
          />
        </>
      )}
      {offerSelected && (
        <>
          <header className={styles.headerdetails}>
            <h4 className={styles.headerdetailstitle}>
              {offers?.details?.title}
            </h4>
            <div className={styles.headerdetailscompany}>
              <span className={styles.headerdetailsprovince}>
                {offers?.details?.province?.value}
              </span>
              <span className={styles.headerdetailscompanyname}>
                {offers?.details?.profile?.name}
              </span>
            </div>
            <Image
              className={styles.headerlogocompany}
              src={offers?.details?.profile?.logoUrl || PATH_IMAGE}
              width={70}
              height={70}
              alt="resultados de busqueda"
            />
            <ButtonsOffer detailsOffer={offers?.details} />
          </header>
          <section className={styles.offerDescription}>
            <section className={styles.typeOffer}>
              <span className={styles.typeOfferOption}>
                {offers?.details?.salaryDescription}
              </span>
              <span className={styles.typeOfferOption}>
                {offers?.details?.contractType?.value}
              </span>
              <span className={styles.typeOfferOption}>
                {offers?.details?.journey?.value}
              </span>
            </section>
            <div className={styles.aboutEmployment}>
              <h5 className={styles.aboutEmploymentTitle}>Sobre el empleo</h5>
              <p className={styles.aboutEmploymentOption}>
                <h6 className={styles.category}>Categoría: </h6>
                <span className={styles.categoryDescription}>
                  {offers?.details?.category?.value}
                </span>
              </p>
              <p className={styles.aboutEmploymentOption}>
                <h6 className={styles.category}>Subcategoría: </h6>
                <span className={styles.categoryDescription}>
                  {offers?.details?.subcategory?.value}
                </span>
              </p>
              <p className={styles.aboutEmploymentOption}>
                <h6 className={styles.category}>Estudios mínimos</h6>
                <span className={styles.categoryDescription}>
                  {offers?.details?.studiesMin?.value}
                </span>
              </p>
            </div>
            <div className={styles.aboutEmployment}>
              <h5 className={styles.aboutEmploymentTitle}>Requisitos</h5>
              <p className={styles.aboutEmploymentOption}>
                <h6 className={styles.category}>Experiencia mínima</h6>
                <span className={styles.categoryDescription}>
                  {offers?.details?.experienceMin?.value}
                </span>
              </p>
              <div className={styles.aboutEmploymentOption}>
                <h6 className={styles.category}>Conocomientos necesarios</h6>
                <div className={styles.skillContainer}>
                  {offers?.details?.skillsList?.map((skill) => (
                    <span className={styles.skill} key={uuid()}>
                      {skill.skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.aboutEmploymentOption}>
                <h6 className={styles.category}>Requisitos mínimos</h6>
                {offers?.details?.minRequirements && (
                  <span
                    className={styles.categoryDescription}
                    dangerouslySetInnerHTML={{
                      __html: ConvertLineBreaks(
                        offers?.details?.minRequirements
                      ),
                    }}
                  ></span>
                )}
              </div>
            </div>
            <h5 className={styles.aboutEmploymentTitle}>Descripción</h5>
            {offers?.details?.description && (
              <p
                className={styles.categoryDescription}
                dangerouslySetInnerHTML={{
                  __html: ConvertLineBreaks(offers?.details?.description),
                }}
              ></p>
            )}
          </section>
        </>
      )}
    </>
  );
}
