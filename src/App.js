import "./App.css";
import { Box, Grid, Container } from "@mui/material";
import StationCard from "./components/stationcard";
import stations from "./mockStations";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import NowPlaying from "./components/nowplaying";

function App() {
  // load fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Monoton", "Turret Road"],
      },
    });
  }, []);

  // stores which station is currently playing
  const [playing, setPlaying] = useState(null);

  // handles when a radio station is played
  function handleClick(station) {
    setPlaying(station?.call_sign);
  }

  return (
    <div className="App">
      <Box
        sx={{
          width: "85%",
          margin: "auto",
        }}
      >
        <div className="title">campus.fm</div>
        <div className="detail">listen to campus radio stations</div>
        <NowPlaying playing={playing} />
      </Box>
      <Container>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, md: 3 }}>
          {stations.map((station) => {
            return (
              <Grid item xs={12} md={4}>
                <StationCard
                  key={station.id}
                  callsign={station.call_sign}
                  image={station.image}
                  college={station.college_name}
                  audioURL={station.audio_url}
                  handleClick={handleClick}
                  stationObject={station}
                  playing={playing}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
