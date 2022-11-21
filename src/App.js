import "./App.css";
import { Box, Grid, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

// count is passed as argument, offset as optional arg
const getItems = (count, offset = 0) =>
  // builds shallow array of length equal to count
  // Array.from(arrayLike, (element, index) => { /* … */ })
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: stations[k + offset],
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  console.log(result);

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  paddingRight: grid * 4,
  margin: `0 0 ${grid}px 0`,
  borderRadius: 7,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 500,
});

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
        "KUNM",
        "WSBF",
        "WERS",
      ];
      let defaultStations = [];
      defaultStations = stations.filter((station) =>
        defaultCallsigns.includes(station.call_sign)
      );
      setSelectedStations(defaultStations);
    }

    // check and try to load 525/404 error stations every 5s (handleStall should catch stations that are loaded but stalled)
    // setInterval(() => {
    //   const loadedStations = document.getElementsByClassName("audio-element");
    //   for (let station of loadedStations) {
    //     if (station.readyState === 0) {
    //       const url = station.getAttribute("src");
    //       let altered = "";

    //       // add/remove cors proxy and try again
    //       if (url.startsWith("https://cors-proxy.elfsight.com/")) {
    //         altered = url.substring(32);
    //       } else {
    //         altered = "https://cors-proxy.elfsight.com/" + url;
    //       }

    //       station.setAttribute("src", "");
    //       setTimeout(function () {
    //         station.load(); // This stops the stream from downloading; basically forces it to load an empty file
    //       }, 100);
    //       station.setAttribute("src", altered);
    //       station.load();
    //       // console.log(station.getAttribute("src"));
    //       // console.log(
    //       //   "loading " + station.getAttribute("name") + station.readyState
    //       // );
    //     }
    //   }
    // }, 5000);
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

  const [droppableState, setDroppableState] = useState([
    getItems(2),
    getItems(10, 20),
  ]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(
        droppableState[sInd],
        source.index,
        destination.index
      );
      const newState = [...droppableState];
      newState[sInd] = items;
      setDroppableState(newState);
    } else {
      const result = move(
        droppableState[sInd],
        droppableState[dInd],
        source,
        destination
      );
      const newState = [...droppableState];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setDroppableState(newState);
    }
  }

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
          <Box sx={{ display: "flex" }}>
            <Container sx={{ background: "blue" }}>
              <div style={{ display: "flex" }}>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable
                    key={0}
                    droppableId={`0`}
                    isDropDisabled={droppableState[0].length > 7 ? true : false}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                      >
                        {droppableState[0].map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <StationCard
                                  callsign={item.content.call_sign}
                                  frequency={item.content.broadcast_frequency}
                                  college={item.content.college_name}
                                  audioURL={item.content.audio_url}
                                  collegeimage={item.content.college_image}
                                  setPlaying={setPlaying}
                                  stationObject={item.content}
                                  playing={playing}
                                  volume={volume}
                                  setPlayStatic={setPlayStatic}
                                  userPause={userPause}
                                  setUserPause={setUserPause}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div style={{ height: 100, width: 100 }}></div>
                  <div className="scroller">
                    <Droppable key={1} droppableId={`1`}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}
                        >
                          {droppableState[1].map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <StationCard
                                    callsign={item.content.call_sign}
                                    frequency={item.content.broadcast_frequency}
                                    college={item.content.college_name}
                                    audioURL={item.content.audio_url}
                                    collegeimage={item.content.college_image}
                                    setPlaying={setPlaying}
                                    stationObject={item.content}
                                    playing={playing}
                                    volume={volume}
                                    setPlayStatic={setPlayStatic}
                                    userPause={userPause}
                                    setUserPause={setUserPause}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </DragDropContext>
              </div>{" "}
            </Container>
          </Box>
          {/* <Footer handleSelectorModalOpen={handleSelectorModalOpen} /> */}
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
