export default function NowPlaying({playing}) {
  return (
    <div>
      Now playing: {playing ? playing : "none"}
    </div>
  )
}