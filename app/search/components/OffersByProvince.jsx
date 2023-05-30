"use client";

import { SkeletonLayout } from "@/app/components/skeleton/SkeletonLayout";
import {
  ArrayCategory,
  ArrayContractType,
  ArrayProvinces,
  ArrayStudies,
  ArrayWorkDay,
  ArrowIcon,
  ArrowPrevIcon,
  CopyLinkIcon,
} from "@/app/constants";
import { useEffect, useState } from "react";
import { GetInfoJobsOffers } from "../../services/infojobsAPI";
import OfferPreview from "./OfferPreview";
import styles from "./offers.module.css";
import { Montserrat } from "next/font/google";
import { OfferView } from "./OfferView";
import { ComboBox } from "./ComboBox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SwipeableEdgeDrawer from "./SwipeDrawer";

const font = Montserrat({ subsets: ["latin"] });

export function OffersByProvince({ parameter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [offers, setOffers] = useState({});
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getJobs = async () => {
      const data = await GetInfoJobsOffers(`${parameter}`, `${currentPage}`);
      setOffers(data);
    };
    getJobs();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(offers?.product?.totalPages);
  };

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const HandlerSelectedOffer = (id) => {
    setSelectedOfferId(id);
    toggleDrawer(true);
  };

  console.log(open);

  const renderPageButtons = () => {
    const pageRange = 5; // Cantidad de botones intermedios a mostrar
    const pageButtons = [];
    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = Math.min(
      offers?.product?.totalPages,
      startPage + pageRange - 1
    );

    if (endPage - startPage < pageRange - 1) {
      startPage = Math.max(1, endPage - pageRange + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      const isActive = page === currentPage;
      function handleClick() {
        handlePageChange(page);
      }
      pageButtons.push(
        <button
          key={page}
          onClick={handleClick}
          className={`${styles.page} ${isActive && styles.pageIsActive} ${
            font.className
          } `}
          disabled={page === currentPage}
        >
          {page}
        </button>
      );
    }
    return pageButtons;
  };

  return (
    <>
      <section className={styles.comboboxContainer}>
        <ComboBox
          parameter={parameter}
          arrayItems={ArrayProvinces}
          title={"Provincia"}
        />
        <ComboBox
          parameter={"None"}
          arrayItems={ArrayCategory}
          title={"Categoría"}
        />
        <ComboBox
          parameter={"None"}
          arrayItems={ArrayStudies}
          title={"Estudios mínimos"}
        />
        <ComboBox
          parameter={"None"}
          arrayItems={ArrayWorkDay}
          title={"Jornada laboral"}
        />
        <ComboBox
          parameter={"None"}
          arrayItems={ArrayContractType}
          title={"Tipo de contrato"}
        />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-basic"
            label="Palabra clave"
            variant="filled"
            placeholder="Empresa, habilidad, etc."
            size="small"
          />
        </Box>
        <Stack
          spacing={1}
          direction="row"
          style={{ minHeight: "3.9em", padding: "0.5em" }}
        >
          <Button variant="contained" size="small">
            <CopyLinkIcon />
            Buscar empleo
          </Button>
        </Stack>
      </section>
      <div className={`${styles.container} ${font.className}`}>
        <div className={styles.works}>
          {offers.product === undefined && <SkeletonLayout />}
          {offers?.product?.items?.map((job, index) => (
            <OfferPreview
              key={job.id}
              Job={job}
              id={job.id}
              isSelected={selectedOfferId === job.id}
              onClick={() => HandlerSelectedOffer(job.id)}
            />
          ))}
          <nav className={styles.navigationPage}>
            {currentPage > 3 && (
              <button
                className={`${styles.buttonsNavPage} `}
                onClick={handleFirstPage}
                disabled={currentPage === 1}
              >
                {1}
              </button>
            )}
            <button
              className={styles.buttonsNavPage}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ArrowIcon />
            </button>
            {renderPageButtons()}
            <button
              className={`${styles.buttonsNavPage} `}
              onClick={handleNextPage}
              disabled={currentPage === offers?.product?.totalPages}
              tooltip="65"
            >
              <ArrowPrevIcon />
            </button>
            {currentPage < offers?.product?.totalPages - 2 && (
              <button
                className={styles.buttonsNavPage}
                onClick={handleLastPage}
                disabled={currentPage === offers?.product?.totalPages}
              >
                {offers?.product?.totalPages}
              </button>
            )}
          </nav>
        </div>
        <div className={styles.description}>
          <OfferView offerSelected={selectedOfferId} />
        </div>
      </div>
      <div>
        <SwipeableEdgeDrawer
          offerSelected={selectedOfferId}
          openDescription={open}
          setOpen={setOpen}
        />
      </div>
    </>
  );
}
