import "./App.css";
import { AppBar, Box, Grid, Container } from "@mui/material";
import StationCard from "./components/stationcard";
import Footer from "./components/footer";
import Logo from "./components/logo";
import stations from "./stations";
import Bulb from "react-bulb";
import WebFont from "webfontloader";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import NowPlaying from "./components/nowplaying";

function App() {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 800,
        lg: 1200,
        xl: 1350,
      },
    },
  });

  // load fonts on initial page load
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Monoton", "Turret Road", "Share Tech Mono"],
      },
    });
  }, []);

  // stores which station is currently playing
  const [playing, setPlaying] = useState(null);
  const [playStatic, setPlayStatic] = useState(false);

  // plays static when playStatic state changes
  useEffect(() => {
    const staticSound = document.getElementsByClassName("staticAudio")[0];
    staticSound.volume = 0.3;
    if (playStatic === true) staticSound.play();
    if (playStatic === false) staticSound.pause();
  }, [playStatic]);

  // basically just sets the playing state, passed into card (maybe not optimal)
  function handleClick(station) {
    setPlaying(station);
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppBar
          position="absolute"
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: 2,
            position: "fixed",
            width: "100%",
            background: "#2e2e2e",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", xl: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              margin: "auto",
              width: "80%",
            }}
          >
            <Logo />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: { xs: 0, md: 3 },
              }}
            >
              <NowPlaying playing={playing} />
              <Box
                sx={{
                  display: { xs: "none", sm: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                <Box sx={{ ml: { xs: 3, s: 0, xl: 0 }, mr: 1 }}>ON/OFF</Box>
                <Box>
                  {playing && <Bulb size={20} color="green" />}
                  {!playing && <Bulb size={20} color="black" />}
                </Box>
              </Box>
            </Box>
          </Box>
        </AppBar>
        <Box sx={{ height: { xs: "240px", xl: "180px" } }} />
      </ThemeProvider>
      <Container sx={{ width: "85%" }}>
        <Grid
          container
          justifyContent="space-between"
          rowSpacing={2}
          columnSpacing={{ lg: 4, md: 3 }}
        >
          {stations.map((station) => {
            return (
              <Grid item md={12} lg={6} sx={{ width: "100%" }} key={station.id}>
                <StationCard
                  callsign={station.call_sign}
                  frequency={station.broadcast_frequency}
                  college={station.college_name}
                  audioURL={station.audio_url}
                  collegeimage={station.college_image}
                  handleClick={handleClick}
                  stationObject={station}
                  playing={playing}
                  setPlayStatic={setPlayStatic}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Footer />
      <audio
        className="staticAudio"
        preload="auto"
        loop
        src="https://www.soundjay.com/mechanical/sounds/tv-static-05.mp3"
      />
    </div>
  );
}

export default App;
