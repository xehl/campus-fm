import { Box, Typography, Button } from "@mui/material"
import ReactGA from "react-ga4"

export default function Footer({ handleSelectorModalOpen, darkMode }) {

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
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 3,
      px: 2,
    }}>
      <Button
        onClick={footerEvent}
        variant="outlined"
        sx={{
          borderColor: darkMode ? '#666' : '#8a8a8a',
          ':hover': {
            borderColor: '#b0b0b0',
          }
        }}
      >
        <Typography
          sx={{ color: darkMode ? "rgba(255,255,255,0.9)" : "inherit", fontSize: 20, fontWeight: "bold" }}
          fontFamily={"Turret Road"}
          onClick={handleSelectorModalOpen}
        >
          select new stations
        </Typography>
      </Button>
      <Typography
        component="p"
        sx={{
          fontFamily: "Turret Road",
          fontSize: { xs: "0.8rem", sm: "0.85rem" },
          color: darkMode ? "rgba(255,255,255,0.6)" : "rgba(181, 181, 181, 0.53)",
          textAlign: "center",
          maxWidth: 520,
          mt: 2,
          lineHeight: 1.5,
        }}
      >
        listen to college radio and student radio from north america and europe—stations from 40+ us states, uk, and beyond. 170+ stations, completely free.
      </Typography>
    </Box>
  )
}