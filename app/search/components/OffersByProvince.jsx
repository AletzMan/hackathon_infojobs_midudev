"use client"

import React from "react"
import { SkeletonLayout } from "@/app/components/skeleton/SkeletonLayout"
import {
  ArrayCategory,
  ArrayContractType,
  ArrayProvinces,
  ArrayStudies,
  ArrayWorkDay,
  ArrowIcon,
  ArrowPrevIcon,
  SearchIcon,
} from "@/app/constants"
import { useEffect, useState } from "react"
import { GetOffers } from "../../services/infojobsAPI"
import styles from "./offers.module.css"
import { Montserrat } from "next/font/google"
import { OfferView } from "./OfferView/OfferView"
import SwipeableEdgeDrawer from "./SwipeDrawer"
import { ExtractQueryParams } from "@/app/utilities/functions"
import { useRouter } from "next/navigation"
import { SingelOfferView } from "./SingleOfferView/SingleOfferView"

const font = Montserrat({ subsets: ["latin"] })

export function OffersByProvince({ parameter }) {
  const params = ExtractQueryParams(parameter)
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(parseInt(params?.page) || 1)
  const [offers, setOffers] = useState({})
  const [selectedOfferId, setSelectedOfferId] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const getJobs = async () => {
      const data = await GetOffers(params, `${currentPage}`)
      setOffers(data)
    }
    getJobs()
  }, [])

  useEffect(() => {
    router.push(
      `/search/location=${params.location}&work=${params.work}&page=${currentPage}`
    )
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handleFirstPage = () => {
    setCurrentPage(1)
  }

  const handleLastPage = () => {
    setCurrentPage(offers?.product?.totalPages)
  }

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen)
  }

  const HandlerSelectedOffer = (id) => {
    setSelectedOfferId(id)
    toggleDrawer(true)
  }

  const renderPageButtons = () => {
    const pageRange = 5 // Cantidad de botones intermedios a mostrar
    const pageButtons = []
    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2))
    let endPage = Math.min(
      offers?.product?.totalPages,
      startPage + pageRange - 1
    )

    if (endPage - startPage < pageRange - 1) {
      startPage = Math.max(1, endPage - pageRange + 1)
    }

    for (let page = startPage; page <= endPage; page++) {
      const isActive = page === currentPage
      function handleClick() {
        handlePageChange(page)
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
      )
    }
    return pageButtons
  }

  return (
    <>
      {/*
        <section className={styles.comboboxContainer}>
          <ComboBox
            parameter={params.location}
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
            title={"Estudios"}
          />
          <ComboBox
            parameter={"None"}
            arrayItems={ArrayWorkDay}
            title={"Jornada"}
          />
          <ComboBox
            parameter={"None"}
            arrayItems={ArrayContractType}
            title={"Contrato"}
          />
          <Box
            sx={{
              m: 1,
              maxWidth: "150px",
              color: "#FFFFFF",
            }}
            autoComplete="off"
          >
            <input
              style={{
                backgroundColor: "#21263d",
                border: "none",
                borderBottom: "1px solid #167db7",
                fontSize: "0.8em",
                fontWeight: "100",
                padding: "0.5em 1em",
                height: "100%",
                height: "3.2em",
                maxWidth: "150px",
              }}
              placeholder="puesto, área o empresa"
            ></input>
          </Box>
          <Stack
            direction="row"
            style={{
              height: "100%",
              maxHeight: "3.6em",
              padding: "0.5em",
              marginBottom: "0.7em",
              justifySelf: "left",
              display: "flex",
              gap: "0.8em",
            }}
          >
            <Button variant="contained" size="small">
              <SearchIcon />
              Buscar empleo
            </Button>
          </Stack>
        </section>*/}
      <div className={`${styles.container} ${font.className}`}>
        <div className={styles.works}>
          {offers.product === undefined && <SkeletonLayout />}
          {offers?.product?.items?.map((job, index) => (
            <SingelOfferView
              key={job.id}
              offer={job}
              id={job.id}
              isSelected={selectedOfferId === job.id}
              HandleOpenViewOffer={() => HandlerSelectedOffer(job.id)}
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
  )
}
