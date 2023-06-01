"use client"

import PropTypes from "prop-types"
import { Global } from "@emotion/react"
import { styled } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { grey } from "@mui/material/colors"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import { Fab } from "@mui/material"
import { ChatBotIcon } from "@/app/constants"
import { ConversationChat } from "./ConversationChat"
import SwipeableEdgeDrawer from "../components/SwipeDrawer"
import ModalView from "../components/ModalView"
import { useEffect, useRef, useState } from "react"

const drawerBleeding = 0

const colorHeader = "#CDCDCD"
const colorTextHeader = "#167db7"
const colorChat = "#E0E0E0"
const colorTextChat = "#050505"
const colorTextButton = "#167db7"

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: "transparent",
}))

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: colorChat,
  width: "26em",
}))

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[600] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}))

const thumbStyles = {
  WebkitSliderThumb: {
    backgroundColor: "red",
    width: "20px",
    height: "20px",
  },
}

export function ChatDrawer(props) {
  const { window } = props
  const [open, setOpen] = useState(false)
  const [messageState, setMessageState] = useState("")
  const chatRef = useRef(null)
  const [selectedOfferId, setSelectedOfferId] = useState(null)
  const [openOffer, setOpenOffer] = useState(false)

  useEffect(() => {
    if (chatRef) {
      const handleScroll = (event) => {
        const { currentTarget: target } = event
        target.scroll({ top: target.scrollHeight })
        console.log("CAMBIO")
      }

      chatRef.current?.addEventListener("DOMNodeInserted", handleScroll)

      return () => {
        chatRef.current?.removeEventListener("DOMNodeInserted", handleScroll)
      }
    }
  }, [messageState])

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }
  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <Root>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(80% - ${drawerBleeding}px)`,
              overflow: "visible",
              width: "26em",

              borderTopRightRadius: 18,
              borderTopLeftRadius: 18,
              margin: "0 0 0 auto",
            },
          }}
        />
        <Box
          sx={{
            textAlign: "center",
            pt: 1,
            padding: "0",
            display: "flex",
            gap: "1em",
            borderRadius: "4em",
          }}
        >
          <Fab
            variant="extended"
            onClick={toggleDrawer(true)}
            style={{ color: colorTextButton, fontWeight: "bold" }}
          >
            <ChatBotIcon />
            ChatBot
          </Fab>
        </Box>
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {" "}
          <StyledBox
            ref={chatRef}
            sx={{
              position: "absolute",
              px: 2,
              pb: 2,
              height: "100%",
              overflowY: "auto",
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
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
            }}
          >
            {/*<Skeleton variant="rectangular" height="100%" />*/}
            <ConversationChat
              setMessageState={setMessageState}
              setOpenOffer={setOpenOffer}
              setSelectedOfferId={setSelectedOfferId}
            />
          </StyledBox>
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              visibility: "visible",
              borderTopRightRadius: 18,
              borderTopLeftRadius: 18,
            }}
          >
            <Puller />
            <Box
              sx={{
                p: 2,
                color: "text.secondary",
                textAlign: "center",
                color: colorTextHeader,
                fontWeight: "bold",
                backgroundColor: colorHeader,
                borderRadius: "1em 0 0 0",
                borderBottom: "1px solid #15151535",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChatBotIcon />
              <div
                style={{
                  display: "flex",
                  maxWidth: "7.5em",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                InfoBot - Chat
                <div
                  style={{
                    width: "0.7em",
                    height: "0.7em",
                    backgroundColor: "#32CD32",
                    margin: "0 0 0 0.2em",
                    borderRadius: "1em",
                  }}
                ></div>
                <span
                  style={{
                    color: "black",
                    fontWeight: "normal",
                    fontSize: "0.8em",
                    margin: "0 0 0 0.3em",
                  }}
                >
                  Online
                </span>
              </div>
            </Box>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
      <ModalView
        selectedOfferId={selectedOfferId}
        openOffer={openOffer}
        setOpenOffer={setOpenOffer}
      />
    </>
  )
}
