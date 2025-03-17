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
import { HelmetProvider } from 'react-helmet-async';
import SEO from "./components/seo";

// Returns uppercase station call sign or null
const parseStationFromUrl = () => {
  const path = window.location.pathname;
  if (path === "/") return null;
  const station = path.replace(/^\/|\/$/g, "").trim();
  return station.toUpperCase();
};

// Returns station object or null
const findStationInStations = (callSign) => {
  return (
    stations.find((station) => station.call_sign.toUpperCase() === callSign) ||
    null
  );
};

export default function App() {
  // MUI theme breakpoints
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#ffffff',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#212121',
        secondary: darkMode ? '#b3b3b3' : '#757575',
      }
    },
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

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // fire on initial page load
  useEffect(() => {
    // load custom fonts
    WebFont.load({
      google: {
        families: ["Monoton", "Turret Road", "Share Tech Mono"],
      },
    });

    // Check for station in URL
    const urlStation = parseStationFromUrl();
    const stationFromUrl = urlStation
      ? findStationInStations(urlStation)
      : null;

    // Load stations from localStorage or use defaults
    const cache = JSON.parse(localStorage.getItem("recentStations"));
    let initialStations =
      cache ||
      stations.filter((station) =>
        ["WXYC", "KALX", "KVRX", "WUCF", "WSUM", "WSBF", "WXTJ"].includes(
          station.call_sign
        )
      );

    // If URL has a station, handle it
    if (stationFromUrl) {
      if (
        initialStations.some((s) => s.call_sign === stationFromUrl.call_sign)
      ) {
        // If station exists in list, move it to front
        initialStations = [
          stationFromUrl,
          ...initialStations.filter(
            (s) => s.call_sign !== stationFromUrl.call_sign
          ),
        ];
      } else {
        // If station isn't in list, prepend it (temporarily dropping last station if at limit)
        initialStations = [stationFromUrl, ...initialStations.slice(0, 9)];
      }
    }

    setSelectedStations(initialStations);

    // check and try to load 525/404 error stations every 8s (handleStall should catch stations that are loaded but stalled)
    setInterval(() => {
      const loadedStations = document.getElementsByClassName("audio-element");
      for (let station of loadedStations) {
        if (station.readyState === 0) {
          const url = station.getAttribute("src");
          let altered = "";

          // // add/remove cors proxy and try again
          // if (url.startsWith("https://cors-proxy.elfsight.com/")) {
          //   altered = url.substring(32);
          // } else {
          //   altered = "https://cors-proxy.elfsight.com/" + url;
          // }

          altered = url;

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
    }, 8000);
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
    <HelmetProvider>
      <div className="App">
        <SEO station={playing} />
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
                darkMode={darkMode}
                setDarkMode={setDarkMode}
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
                darkMode={darkMode}
                setDarkMode={setDarkMode}
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
                        stationObject={station}
                        setPlaying={setPlaying}
                        playing={playing}
                        volume={volume}
                        setPlayStatic={setPlayStatic}
                        userPause={userPause}
                        setUserPause={setUserPause}
                        darkMode={darkMode}
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
    </HelmetProvider>
  );
}
