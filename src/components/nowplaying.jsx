import {Typography} from '@mui/material'

export default function NowPlaying({ playing }) {
  return (
    <Typography>
      Now playing: {playing ? playing : "none"}
    </Typography>
  )
}