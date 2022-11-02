import { AppBar } from "@mui/material"; 
import NowPlayingSmall from "./nowplayingsm";
import NowPlayingLarge from "./nowplayinglg";

export default function StickyBar({playing, mobileLoaded, setMobileLoaded}) {
  return (
    <AppBar
    elevation={4}
    sx={{
      position: "sticky",
      display: "flex",
      bottom: 0,
      width: "100%",
      background: "white",
      height: "90px",
      boxShadow: 5,
    }}
  >
    <NowPlayingSmall
      playing={playing}
      mobileLoaded={mobileLoaded}
      setMobileLoaded={setMobileLoaded}
      sx={{
        display: { xs: "flex", sm: "none", md: "none" },
        alignItems: "center",
        justifyContent: "center",
      }}
    />
    <NowPlayingLarge
      playing={playing}
      sx={{
        display: { xs: "none", sm: "flex", md: "flex" },
      }}
    />
  </AppBar>
  )
}