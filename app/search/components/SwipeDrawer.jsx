import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Global } from "@emotion/react"
import { styled } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { grey } from "@mui/material/colors"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import { OfferView } from "./OfferView/OfferView"
import styles from "./offers.module.css"
import { useState } from "react"
const drawerBleeding = 10

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: "transparent",
}))

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "var(--SecondColor)",
}))

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[600] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  backgroundColor: "#021227",
}))

function SwipeableEdgeDrawer(props) {
  const { window } = props
  const [open, setOpen] = useState(props.openDescription)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  useEffect(() => {
    setOpen(props.openDescription)
  }, [props.openDescription])

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(90% - ${drawerBleeding}px)`,
            overflow: "visible",
            backgroundColor: "#021227",
          },
        }}
      />
      <Box sx={{ textAlign: "center", pt: 1 }}>
        {/*<Button
          onClick={toggleDrawer(true)}
          style={{ position: "absolute", top: "5em" }}
        >
          Open
      </Button>*/}
      </Box>
      <SwipeableDrawer
        className={styles.descriptionMobil}
        container={container}
        anchor="bottom"
        open={open}
        onClose={() => {
          toggleDrawer(false), props.setOpen(false)
        }}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 3.5, color: "text.secondary" }}></Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
            marginTop: "3em",
          }}
        >
          <OfferView offerSelected={props.offerSelected} />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  )
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default SwipeableEdgeDrawer
