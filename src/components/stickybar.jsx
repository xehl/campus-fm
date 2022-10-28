import { AppBar } from "@mui/material"; 
import NowPlayingSmall from "./nowplayingsm";
import NowPlayingLarge from "./nowplayinglg";

export default function StickyBar({playing}) {
  return (
    <AppBar
    position="sticky"
    sx={{
      display: "flex",
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
        display: { xs: "flex", sm: "flex", md: "none" },
        alignItems: "center",
        justifyContent: "center",
      }}
    />
    <NowPlayingLarge
      playing={playing}
      sx={{
        display: { xs: "none", sm: "none", md: "flex" },
      }}
    />
  </AppBar>
  )
}