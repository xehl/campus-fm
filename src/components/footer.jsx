import { Box, Typography, Link } from "@mui/material"

export default function Footer() {
  return (
    <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
          color: "white",
          mt: 2,
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: 20, fontWeight: "bold", mr: 1 }}
          fontFamily={"Turret Road"}
        >
          created by
        </Typography>
        <Link
          target="_blank"
          sx={{ fontSize: 20 }}
          href="https://github.com/xehl/campus-fm"
        >
          @xehl
        </Link>
      </Box>
  )
}