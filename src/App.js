import "./App.css";
import { Box, Grid, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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
import { PROXY_BASE_URL } from "./utils/proxyHelper";

const SITE_URL = "https://campus-fm.com";

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

    // Load stations from localStorage or use defaults.
    // Resolve cached stations to current data from stations.js so updated audio_url (and other fields) apply.
    const defaults = stations.filter((station) =>
      ["WXYC", "KALX", "KVRX", "WUCF", "WSUM", "WSBF", "WXTJ"].includes(
        station.call_sign
      )
    );
    const cache = JSON.parse(localStorage.getItem("recentStations"));
    let initialStations;
    if (cache && Array.isArray(cache) && cache.length > 0) {
      initialStations = cache
        .map((cached) => stations.find((s) => s.call_sign === cached.call_sign))
        .filter(Boolean);
      if (initialStations.length === 0) initialStations = defaults;
    } else {
      initialStations = defaults;
    }

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

    // Background retry for non-playing stations that failed to buffer on initial load.
    // The active-playing station's recovery is handled by stationcard's handleStall/handleError/handleEnded.
    const retryState = {}; // { stationName: { attempts: number, nextRetry: timestamp } }
    const MAX_RETRIES_DIRECT = 5;
    const MAX_RETRIES_PROXY = 3;
    const BASE_DELAY_DIRECT = 8000;  // 8 seconds
    const BASE_DELAY_PROXY = 20000;  // 20 seconds for proxied streams
    const MAX_DELAY = 300000;        // 5 minutes max

    setInterval(() => {
      const loadedStations = document.getElementsByClassName("audio-element");
      const now = Date.now();

      for (let station of loadedStations) {
        const stationName = station.getAttribute("name");

        // Skip stations that are currently playing or paused mid-stream;
        // their recovery is handled at the component level.
        if (!station.paused) continue;

        const src = station.getAttribute("src") || "";
        const isProxied = src.startsWith(PROXY_BASE_URL);
        const maxRetries = isProxied ? MAX_RETRIES_PROXY : MAX_RETRIES_DIRECT;
        const baseDelay = isProxied ? BASE_DELAY_PROXY : BASE_DELAY_DIRECT;

        if (station.readyState === 0) {
          if (!retryState[stationName]) {
            retryState[stationName] = { attempts: 0, nextRetry: 0 };
          }

          const state = retryState[stationName];

          if (state.attempts >= maxRetries) {
            continue;
          }

          if (now < state.nextRetry) {
            continue;
          }

          state.attempts++;
          const backoffDelay = Math.min(baseDelay * Math.pow(2, state.attempts - 1), MAX_DELAY);
          state.nextRetry = now + backoffDelay;

          const url = station.getAttribute("src");
          station.setAttribute("src", "");
          station.load();
          station.setAttribute("src", url);
          station.load();
        } else if (station.readyState >= 1 && retryState[stationName]) {
          delete retryState[stationName];
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

  // For SEO: current station from URL (used for title, description, JSON-LD)
  const urlStation = parseStationFromUrl();
  const stationFromUrl = urlStation ? findStationInStations(urlStation) : null;

  const pageTitle = stationFromUrl
    ? `${stationFromUrl.call_sign} ${stationFromUrl.broadcast_frequency} - ${stationFromUrl.college_name} | Campus FM`
    : "Campus FM - stream college radio";
  const pageDescription = stationFromUrl
    ? `Listen to ${stationFromUrl.call_sign} ${stationFromUrl.broadcast_frequency} FM - ${stationFromUrl.college_name} college radio live on Campus FM.`
    : "Live stream college radio stations from universities across North America. Listen to student radio online free.";
  const canonicalUrl = stationFromUrl ? `${SITE_URL}/${stationFromUrl.call_sign}` : SITE_URL + "/";

  const jsonLd = stationFromUrl
    ? {
        "@context": "https://schema.org",
        "@type": "RadioStation",
        name: `${stationFromUrl.call_sign} ${stationFromUrl.broadcast_frequency} FM`,
        description: pageDescription,
        url: canonicalUrl,
        broadcastDisplayName: stationFromUrl.college_name,
        parentOrganization: { "@type": "Organization", name: stationFromUrl.college_name },
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Campus FM",
        description: pageDescription,
        url: SITE_URL,
        potentialAction: { "@type": "ListenAction", target: SITE_URL },
      };

  return (
    <div className="App">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
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
              flexDirection: "row",
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
          <Footer handleSelectorModalOpen={handleSelectorModalOpen} darkMode={darkMode} />
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
