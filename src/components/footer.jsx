import { Box, Typography, Button } from "@mui/material"
import ReactGA from "react-ga4"

export default function Footer({ handleSelectorModalOpen }) {

  function footerEvent() {
    handleSelectorModalOpen()
    ReactGA.event({
      category: "Modal",
      action: "User opened selector modal via footer",
    });
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      p:2,
    }}>
      <Button
        onClick={footerEvent}
        variant="outlined"
        sx={{
          borderColor: '#2e2e2e',
          ':hover': {
            borderColor: '#b0b0b0',
          }
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: 20, fontWeight: "bold"}}
          fontFamily={"Turret Road"}
          onClick={handleSelectorModalOpen}
        >
          select new stations
        </Typography>
      </Button>
    </Box>
  )
}