const stations = [
  {
    id: 1,
    call_sign: "WXYC",
    broadcast_frequency: "89.3",
    audio_url: "https://audio-mp3.ibiblio.org/wxyc.mp3",
    station_url: "https://wxyc.org/",
    college_name: "University of North Carolina at Chapel Hill",
    public_private: "public",
    city: "Chapel Hill",
    state: "NC",
    station_image: "https://radiostationusa.fm/assets/image/radio/180/WXYC.jpg",
    college_image:
      "https://assets-sports.thescore.com/basketball/team/756/logo.png",
  },
  {
    id: 2,
    call_sign: "KALX",
    broadcast_frequency: "90.7",
    audio_url: "https://stream.kalx.berkeley.edu:8443/kalx-128.mp3",
    station_url: "https://www.kalx.berkeley.edu/",
    college_name: "University of California, Berkeley",
    public_private: "public",
    city: "Berkeley",
    state: "CA",
    station_image:
      "https://www.kalx.berkeley.edu/sites/default/files/styles/large/public/KALX-55.png?itok=RaHLCXkA",
    college_image: "https://wwll.com/images/logos/teams/cal-256.png",
  },
  {
    id: 3,
    call_sign: "KVRX",
    broadcast_frequency: "91.7",
    audio_url: "https://www.kvrx.org/now_playing/stream",
    station_url: "https://kvrx.org/app/",
    college_name: "University of Texas at Austin",
    public_private: "public",
    city: "Austin",
    state: "TX",
    station_image:
      "https://pbs.twimg.com/profile_images/1021906128332980224/tgMrKr7O_400x400.jpg",
    college_image:
      "https://assets-sports.thescore.com/basketball/team/1069/logo.png",
  },
  {
    id: 4,
    call_sign: "WCBN",
    broadcast_frequency: "88.3",
    audio_url: "http://floyd.wcbn.org:8000/wcbn-hd.mp3",
    station_url: "http://www.wcbn.org/",
    college_name: "University of Michigan",
    public_private: "public",
    city: "Ann Arbor",
    state: "MI",
    station_image:
      "http://www.wcbn.org/sites/default/files/wcbn%20logo%20color.jpg?1613678266",
    college_image: "https://cdn.d1baseball.com/logos/teams/256/michigan.png",
  },
  {
    id: 5,
    call_sign: "WUTK",
    broadcast_frequency: "90.3",
    audio_url: "http://streamer.cci.utk.edu:8000/wutk",
    station_url: "https://wutkradio.com/",
    college_name: "University of Tennessee, Knoxville",
    public_private: "Public",
    city: "Knoxville",
    state: "TN",
    station_image: "https://cdn-radiotime-logos.tunein.com/s23442g.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Tennessee_Volunteers_logo.svg/1200px-Tennessee_Volunteers_logo.svg.png",
  },
  {
    id: 6,
    call_sign: "WSUM",
    broadcast_frequency: "91.7",
    audio_url: "https://ice23.securenetsystems.net/WSUMFM",
    station_url: "https://wsum.org/",
    college_name: "University of Wisconsin—Madison",
    public_private: "public",
    city: "Madison",
    state: "WI",
    station_image:
      "https://www.radio.net/images/broadcasts/ec/fb/11375/c300.png",
    college_image:
      "https://www.badgerselect.com/assets/images/FAVIcon/android-chrome-256x256.png",
  },
  {
    id: 7,
    call_sign: "KCOU",
    broadcast_frequency: "88.1",
    audio_url: "https://ssl.shoutcaststreaming.us:8088/stream",
    station_url: "https://kcou.fm/",
    college_name: "University of Missouri",
    public_private: "public",
    city: "Columbia",
    state: "MO",
    station_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Kcou-logo.jpg/200px-Kcou-logo.jpg",
    college_image:
      "https://assets-sports.thescore.com/basketball/team/684/logo.png",
  },
  {
    id: 8,
    call_sign: "WKNC",
    broadcast_frequency: "88.1",
    audio_url: "http://173.193.205.96:7430/stream",
    station_url: "https://wknc.org/",
    college_name: "North Carolina State University",
    public_private: "Public",
    city: "Raleigh",
    state: "NC",
    station_image:
      "https://storage.googleapis.com/stateless-wknc-org/sites/1/2020/10/wknc881-bow.png",
    college_image:
      "https://trademarks.ncsu.edu/wp-content/uploads/2016/04/cropped-brick-s-1.png",
  },
  {
    id: 9,
    call_sign: "WLUR",
    broadcast_frequency: "91.5",
    audio_url: "https://wlur.radioca.st/stream",
    station_url: "https://my.wlu.edu/wlur",
    college_name: "Washington and Lee University",
    public_private: "private",
    city: "Lexington",
    state: "VA",
    station_image:
      "data:image/jpeg;base64,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",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/a/a8/W%26L_Generals.png",
  },
  {
    id: 10,
    call_sign: "WTBU",
    broadcast_frequency: "89.3",
    audio_url: "http://wtbu.bu.edu:1800/",
    station_url: "https://sites.bu.edu/wtbu/",
    college_name: "Boston University",
    public_private: "private",
    city: "Boston",
    state: "MA",
    station_image:
      "https://i1.sndcdn.com/avatars-000070779841-52d5la-t500x500.jpg",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Boston_University_Terriers_logo.svg/800px-Boston_University_Terriers_logo.svg.png",
  },
  {
    id: 11,
    call_sign: "WKDU",
    broadcast_frequency: "91.7",
    audio_url: "https://streams.wkdu.org/listen.mp3",
    station_url: "https://wkdu.org/",
    college_name: "Drexel University",
    public_private: "Private",
    city: "Philadelphia",
    state: "PA",
    station_image:
      "https://static.tuneyou.com/images/logos/500_500/81/10581/WKDUFM91.7.png",
    college_image:
      "https://drexel.edu/~/media/Images/identity/pageLogos/Drexel_Vertical-stacked_gold.ashx?la=en",
  },
  {
    id: 12,
    call_sign: "WIUX",
    broadcast_frequency: "99.1",
    audio_url: "https://bl-vi-143.uits.indiana.edu:8444/wiuxhigh",
    station_url: "https://www.wiux.org/",
    college_name: "Indiana University Bloomington",
    public_private: "Public",
    city: "Bloomington",
    state: "IN",
    station_image:
      "https://upload.wikimedia.org/wikipedia/en/0/04/WIUX_Logo%2C_Square.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Indiana_Hoosiers_logo.svg/1200px-Indiana_Hoosiers_logo.svg.png",
  },
];

export default stations;
