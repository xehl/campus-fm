import "./App.css";
import { AppBar, Box, Grid, Container } from "@mui/material";
import StationCard from "./components/stationcard";
import Footer from "./components/footer";
import Logo from "./components/logo";
import stations from "./stations";
// import teststations from "./teststations";
import Bulb from "react-bulb";
import WebFont from "webfontloader";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import NowPlayingSmall from "./components/nowplayingsm";
import NowPlayingLarge from "./components/nowplayinglg";

function App() {
  // MUI theme breakpoints
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

  // turns off radio when user presses on/off button
  function offButton() {
    if (playing) {
      const allStations = document.getElementsByClassName("audio-element");
      for (let stream of allStations) {
        stream.pause();
      }
      setPlaying(null);
    }
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
                mb: { xs: -3, md: 3 },
              }}
            >
              <NowPlayingLarge
                playing={playing}
                sx={{
                  display: { xs: "none", sm: "none", md: "flex" },
                }}
              />
              <Box
                onClick={offButton}
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
        <Box
          sx={{
            height: { xs: "120px", sm: "185px", md: "295px", xl: "180px" },
          }}
        />
        <Container sx={{ width: "100%" }}>
          <Grid
            container
            justifyContent="space-between"
            rowSpacing={2}
            columnSpacing={{ lg: 4, md: 3 }}
          >
            {stations.map((station) => {
              return (
                <Grid
                  item
                  md={12}
                  lg={6}
                  sx={{ width: "100%" }}
                  key={station.id}
                >
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
        <AppBar
          position="sticky"
          sx={{
            display: {
              xs: "flex",
              sm: "flex",
              md: "none",
              lg: "none",
              xl: "none",
            },
            borderTop: 2,
            bottom: 0,
            mb: "-20px",
            mt: "10px",
            width: "100%",
            background: "#2e2e2e",
            height: "130px",
          }}
        >
          <NowPlayingSmall
            playing={playing}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </AppBar>
      </ThemeProvider>
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
