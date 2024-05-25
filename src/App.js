import "./App.css";
import { Box, Grid, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import StationCard from "./components/stationcard";
import Footer from "./components/footer";
import Logo from "./components/logo";
import stations from "./stations";
import WebFont from "webfontloader";
import Toolbar from "./components/toolbar";
import SelectorModal from "./components/selectormodal";
import FaqModal from "./components/faqmodal";
import StickyBar from "./components/stickybar";
import ReactGA from "react-ga4";

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
        "WUCF",
        "WSUM",
        "KFJC",
        "WSBF",
      ];
      let defaultStations = [];
      defaultStations = stations.filter((station) =>
        defaultCallsigns.includes(station.call_sign)
      );
      setSelectedStations(defaultStations);
    }

    // check and try to load 525/404 error stations every 5s (handleStall should catch stations that are loaded but stalled)
    setInterval(() => {
      const loadedStations = document.getElementsByClassName("audio-element");
      for (let station of loadedStations) {
        if (station.readyState === 0) {
          const url = station.getAttribute("src");
          let altered = "";

          // add/remove cors proxy and try again
          if (url.startsWith("https://cors-proxy.elfsight.com/")) {
            altered = url.substring(32);
          } else {
            altered = "https://cors-proxy.elfsight.com/" + url;
          }

          station.setAttribute("src", "");
          setTimeout(function () {
            station.load(); // This stops the stream from downloading; basically forces it to load an empty file
          }, 100);
          station.setAttribute("src", altered);
          station.load();
          // console.log(station.getAttribute("src"));
          // console.log(
          //   "loading " + station.getAttribute("name") + station.readyState
          // );
        }
      }
    }, 5000);
  }, []);

  // stores which station is currently playing
  const [playing, setPlaying] = useState(null);
  const [volume, setVolume] = useState(100);
  const [userPause, setUserPause] = useState(false);
  const [selectedStations, setSelectedStations] = useState([]);

  // selector modal controls
  const [selectorOpen, setSelectorOpen] = useState(false);
  const handleSelectorClose = () => setSelectorOpen(false);
  const handleSelectorModalOpen = () => {
    setSelectorOpen(true);
    ReactGA.event({
      category: "Modal",
      action: "User opened selector modal",
    });
  };

  // faq modal controls
  const [faqOpen, setFaqOpen] = useState(false);
  const handleFaqClose = () => setFaqOpen(false);
  const handleFaqModalOpen = () => {
    setFaqOpen(true);
    ReactGA.event({
      category: "Modal",
      action: "User opened FAQ modal",
    });
  };

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
      {/* INVISIBLE SPACER BOX KEEPS FOOTER ON BOTTOM, EVEN ON XL SCREENS,
          OR WHEN NOT ENOUGH CONTENT TO VERTICALLY FILL THE VIEWPORT */}
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: "calc(100vh - 90px)",
            height: "100%",
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              width: "100vw",
              flexDirection: { xs: "column", lg: "row" },
              alignItems: "center",
              justifyContent: "space-around",
              position: "sticky",
              top: 0,
              zIndex: 12,
              boxShadow: 4,
              backgroundColor: "rgba(46,46,46,0.9)",
              backdropFilter: "blur(2px)",
            }}
          >
            <Logo />
            <Toolbar
              playing={playing}
              setPlaying={setPlaying}
              displayedStations={selectedStations}
              volume={volume}
              setVolume={setVolume}
              userPause={userPause}
              setUserPause={setUserPause}
              handleSelectorModalOpen={handleSelectorModalOpen}
              handleFaqModalOpen={handleFaqModalOpen}
              setPlayStatic={setPlayStatic}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100vw", lg: "auto" },
              display: { xs: "flex", lg: "none" },
              justifyContent: "center",
              backgroundColor: "rgba(46,46,46,0.9)",
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              position: "sticky",
              top: 0,
              borderTop: 1,
              borderColor: "#404040",
              zIndex: 12,
              boxShadow: 4,
              backgroundColor: "rgba(46,46,46,0.9)",
              backdropFilter: "blur(3px)",
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
              handleSelectorModalOpen={handleSelectorModalOpen}
              handleFaqModalOpen={handleFaqModalOpen}
              setPlayStatic={setPlayStatic}
            />
          </Box>
          <Box
            sx={{
              height: 15,
            }}
          />
          <SelectorModal
            selectorOpen={selectorOpen}
            handleSelectorClose={handleSelectorClose}
            selectedStations={selectedStations}
            setSelectedStations={setSelectedStations}
            setPlaying={setPlaying}
          />
          <FaqModal faqOpen={faqOpen} handleFaqClose={handleFaqClose} />
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
          <Footer handleSelectorModalOpen={handleSelectorModalOpen} />
          <audio
            className="staticAudio"
            preload="auto"
            loop
            src="https://www.soundjay.com/mechanical/sounds/tv-static-05.mp3"
          />
        </Box>
        <StickyBar playing={playing} />
      </ThemeProvider>
    </div>
  );
}
