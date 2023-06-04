"use client"

import React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useState } from "react"
import { OfferView } from "./OfferView/OfferView"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -25em)",
  width: "100%",
  minWidth: 400,
  maxWidth: 800,
  height: 750,
  bgcolor: "background.paper",
  border: "2px solid #000",
  backgroundColor: "#171717",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  borderRadius: "0.5em",
  scrollbarColor: "#393939",

  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#252525",
    borderRadius: "4px",
    width: "10px",
  },
  "::-webkit-scrollbar": {
    width: "10px",
    backgroundColor: "#ACACAC",
    borderRadius: "0 5px 5px 0",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "#999999" /* Color de la pista */,
    borderRadius: "0 4px 4px 0",
  },
}

export default function ModalView({
  openOffer,
  selectedOfferId,
  setOpenOffer,
}) {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpenOffer(false)

  return (
    <div
      style={{
        position: "absolute",
        left: "2em",
        bottom: "2em",
        backgroundColor: "#757575",
      }}
    >
      <Modal
        open={openOffer}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ backgroundColor: "#75757523" }}
      >
        <Box sx={style}>
          <OfferView offerSelected={selectedOfferId} />
        </Box>
      </Modal>
    </div>
  )
}
