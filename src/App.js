import "./App.css";
import { AppBar, Box, Grid, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import StationCard from "./components/stationcard";
import Footer from "./components/footer";
import Logo from "./components/logo";
import stations from "./stations";
import WebFont from "webfontloader";
import Toolbar from "./components/toolbar";
import SelectorModal from "./components/selectormodal";
import StickyBar from "./components/stickybar";

export default function App() {
  // MUI theme breakpoints
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 821,
        lg: 1200,
        xl: 1350,
      },
    },
  });

  // fire on initial page load
  useEffect(() => {
    // load custom fonts
    WebFont.load({
      google: {
        families: ["Monoton", "Turret Road", "Share Tech Mono"],
      },
    });
    // load cached stations for returning users
    let cache = JSON.parse(localStorage.getItem("recentStations"));
    if (cache) setSelectedStations(cache);
    else {
      // otherwise, load default stations
      let defaultCallsigns = [
        "WXYC",
        "KALX",
        "KVRX",
        "WVFS",
        "WUOG",
        "KUNM",
        "WCBN",
        "WUTK",
      ];
      let defaultStations = [];
      defaultStations = stations.filter((station) =>
        defaultCallsigns.includes(station.call_sign)
      );
      setSelectedStations(defaultStations);
    }
  }, []);

  // stores which station is currently playing
  const [playing, setPlaying] = useState(null);
  const [volume, setVolume] = useState(100);
  const [userPause, setUserPause] = useState(false);
  const [selectedStations, setSelectedStations] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleModalOpen = () => setOpen(true);

  // plays static when playStatic state changes
  const [playStatic, setPlayStatic] = useState(false);
  useEffect(() => {
    const staticSound = document.getElementsByClassName("staticAudio")[0];
    staticSound.volume = 0.3;
    if (playStatic === true) staticSound.play();
    if (playStatic === false) staticSound.pause();
  }, [playStatic]);

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
              }}
            >
              <Toolbar
                playing={playing}
                setPlaying={setPlaying}
                displayedStations={selectedStations}
                volume={volume}
                setVolume={setVolume}
                userPause={userPause}
                setUserPause={setUserPause}
                handleModalOpen={handleModalOpen}
              />
            </Box>
          </Box>
        </AppBar>
        <Box
          sx={{
            height: { xs: 150, sm: 255, md: 255, xl: 140 },
          }}
        />
        <SelectorModal
          open={open}
          handleClose={handleClose}
          selectedStations={selectedStations}
          setSelectedStations={setSelectedStations}
          setPlaying={setPlaying}
        />
        <Container sx={{ width: "100%" }}>
          <Grid
            container
            justifyContent="space-between"
            rowSpacing={2}
            columnSpacing={{ lg: 4, md: 3 }}
          >
            {selectedStations.map((station) => {
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
                    setPlaying={setPlaying}
                    stationObject={station}
                    playing={playing}
                    volume={volume}
                    setPlayStatic={setPlayStatic}
                    userPause={userPause}
                    setUserPause={setUserPause}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
        <Footer />
      </ThemeProvider>
      <audio
        className="staticAudio"
        preload="auto"
        loop
        src="https://www.soundjay.com/mechanical/sounds/tv-static-05.mp3"
      />
      <StickyBar playing={playing} />
    </div>
  );
}
