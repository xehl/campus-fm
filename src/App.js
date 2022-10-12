import "./App.css";
import { Box } from "@mui/material";
import StationCard from "./components/stationcard";
import stations from "./mockStations";
import WebFont from "webfontloader";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Monoton", "Turret Road"],
      },
    });
  }, []);
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
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          columnGap: 4,
          rowGap: 2,
          width: "85%",
          margin: "auto",
        }}
      >
        {stations.map((station) => {
          return (
            <StationCard
              key={station.id}
              callsign={station.call_sign}
              image={station.image}
              college={station.college_name}
              audioURL={station.audio_url}
            />
          );
        })}
      </Box>
    </div>
  );
}

export default App;
