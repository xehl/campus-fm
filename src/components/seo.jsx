import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "Campus FM - Stream College Radio",
  description = "Listen to college radio stations around the world. Live streaming from university radio stations.",
  station = null,
  image = "%PUBLIC_URL%/previewimg.png"
}) {
  const currentUrl = window.location.href;
  
  // Enhanced metadata for radio stations
  const stationMeta = station ? {
    title: `${station.call_sign} ${station.frequency} - ${station.college} | Campus FM`,
    description: `Listen to ${station.call_sign} ${station.frequency}, streaming live from ${station.college}. ${station.genre || 'College radio'} station.`,
    image: station.img_url || image,
    url: `${window.location.origin}/${station.call_sign.toLowerCase()}`
  } : null;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{stationMeta?.title || title}</title>
      <meta name="description" content={stationMeta?.description || description} />
      <link rel="canonical" href={stationMeta?.url || currentUrl} />

      {/* OpenGraph meta tags */}
      <meta property="og:type" content="music.radio_station" />
      <meta property="og:title" content={stationMeta?.title || title} />
      <meta property="og:description" content={stationMeta?.description || description} />
      <meta property="og:image" content={stationMeta?.image || image} />
      <meta property="og:url" content={stationMeta?.url || currentUrl} />
      <meta property="og:site_name" content="Campus FM" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter meta tags */}
      <meta name="twitter:card" content="player" />
      <meta name="twitter:creator" content="@choosy_mom" />
      <meta name="twitter:title" content={stationMeta?.title || title} />
      <meta name="twitter:description" content={stationMeta?.description || description} />
      <meta name="twitter:image" content={stationMeta?.image || image} />

      {/* Schema.org markup for radio stations */}
      {station && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RadioStation",
            "name": station.call_sign,
            "url": stationMeta.url,
            "frequency": station.frequency,
            "broadcastTimezone": station.timezone || "America/New_York",
            "broadcastDisplayName": `${station.call_sign} ${station.frequency}`,
            "parentOrganization": {
              "@type": "CollegeOrUniversity",
              "name": station.college
            },
            "genre": station.genre || "College Radio",
            "image": station.img_url || image,
            "audio": {
              "@type": "AudioObject",
              "contentUrl": station.stream_url,
              "encodingFormat": "audio/mpeg"
            }
          })}
        </script>
      )}
    </Helmet>
  );
}
