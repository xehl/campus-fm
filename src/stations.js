const stations = [
  {
    id: 1,
    call_sign: "WXYC",
    broadcast_frequency: "89.3 FM",
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
    broadcast_frequency: "90.7 FM",
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
    broadcast_frequency: "91.7 FM",
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
    id: 6,
    call_sign: "WSUM",
    broadcast_frequency: "91.7 FM",
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
    broadcast_frequency: "88.1 FM",
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
    call_sign: "WXTJ",
    broadcast_frequency: "100.1 FM",
    audio_url: "https://streams.wtju.net:8443/wtjx-opus-256.ogg",
    station_url: "https://www.wxtj.fm/",
    college_name: "University of Virginia",
    public_private: "Public",
    city: "Charlottesville",
    state: "VA",
    station_image:
      "https://upload.wikimedia.org/wikipedia/en/5/50/WXTJ-LP_2015.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Virginia_Cavaliers_logo.svg/800px-Virginia_Cavaliers_logo.svg.png",
  },
  // {
  //   id: 9,
  //   call_sign: "WLUR",
  //   broadcast_frequency: "91.5 FM",
  //   audio_url: "https://wlur.radioca.st/stream",
  //   station_url: "https://my.wlu.edu/wlur",
  //   college_name: "Washington and Lee University",
  //   public_private: "private",
  //   city: "Lexington",
  //   state: "VA",
  //   station_image:
  //     "data:image/jpeg;base64,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",
  //   college_image:
  //     "https://upload.wikimedia.org/wikipedia/en/a/a8/W%26L_Generals.png",
  // },
  // {
  //   id: 10,
  //   call_sign: "WTBU",
  //   broadcast_frequency: "89.3 FM",
  //   audio_url: "http://wtbu.bu.edu:1800/",
  //   station_url: "https://sites.bu.edu/wtbu/",
  //   college_name: "Boston University",
  //   public_private: "private",
  //   city: "Boston",
  //   state: "MA",
  //   station_image:
  //     "https://i1.sndcdn.com/avatars-000070779841-52d5la-t500x500.jpg",
  //   college_image:
  //     "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Boston_University_Terriers_logo.svg/800px-Boston_University_Terriers_logo.svg.png",
  // },
  // {
  //   id: 11,
  //   call_sign: "WKDU",
  //   broadcast_frequency: "91.7 FM",
  //   audio_url: "https://streams.wkdu.org/listen.mp3",
  //   station_url: "https://wkdu.org/",
  //   college_name: "Drexel University",
  //   public_private: "Private",
  //   city: "Philadelphia",
  //   state: "PA",
  //   station_image:
  //     "https://static.tuneyou.com/images/logos/500_500/81/10581/WKDUFM91.7.png",
  //   college_image:
  //     "https://drexel.edu/~/media/Images/identity/pageLogos/Drexel_Vertical-stacked_gold.ashx?la=en",
  // },
  // {
  //   id: 4,
  //   call_sign: "WCBN",
  //   broadcast_frequency: "88.3 FM",
  //   audio_url: "http://floyd.wcbn.org:8000/wcbn-hd.mp3",
  //   station_url: "http://www.wcbn.org/",
  //   college_name: "University of Michigan",
  //   public_private: "public",
  //   city: "Ann Arbor",
  //   state: "MI",
  //   station_image:
  //     "http://www.wcbn.org/sites/default/files/wcbn%20logo%20color.jpg?1613678266",
  //   college_image: "https://cdn.d1baseball.com/logos/teams/256/michigan.png",
  // },
  // {
  //   id: 5,
  //   call_sign: "WUTK",
  //   broadcast_frequency: "90.3 FM",
  //   audio_url: "http://streamer.cci.utk.edu:8000/wutk",
  //   station_url: "https://wutkradio.com/",
  //   college_name: "University of Tennessee, Knoxville",
  //   public_private: "Public",
  //   city: "Knoxville",
  //   state: "TN",
  //   station_image: "https://cdn-radiotime-logos.tunein.com/s23442g.png",
  //   college_image:
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Tennessee_Volunteers_logo.svg/1200px-Tennessee_Volunteers_logo.svg.png",
  // },
  // {
  //   id: 12,
  //   call_sign: "WKNC",
  //   broadcast_frequency: "88.1 FM",
  //   audio_url: "http://173.193.205.96:7430/stream",
  //   station_url: "https://wknc.org/",
  //   college_name: "North Carolina State University",
  //   public_private: "Public",
  //   city: "Raleigh",
  //   state: "NC",
  //   station_image:
  //     "https://storage.googleapis.com/stateless-wknc-org/sites/1/2020/10/wknc881-bow.png",
  //   college_image:
  //     "https://trademarks.ncsu.edu/wp-content/uploads/2016/04/cropped-brick-s-1.png",
  // },
  // {
  //   id: 13,
  //   call_sign: "WRUV",
  //   broadcast_frequency: "90.1 FM",
  //   audio_url: "http://icecast.uvm.edu:8005/wruv_fm_128",
  //   station_url: "http://wruv.org/",
  //   college_name: "University of Vermont",
  //   public_private: "Public",
  //   city: "Burlington",
  //   state: "VT",
  //   station_image:
  //     "data:image/jpeg;base64,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",
  //   college_image:
  //     "https://upload.wikimedia.org/wikipedia/en/thumb/3/34/Vermont_Catamounts_logo.svg/1200px-Vermont_Catamounts_logo.svg.png",
  // },
  {
    id: 14,
    call_sign: "WPGU",
    broadcast_frequency: "107.1 FM",
    audio_url: "http://ice64.securenetsystems.net/WPGUFM",
    station_url: "http://illinimedia.org/",
    college_name: "University of Illinois-Urbana-Champaign",
    public_private: "Public",
    city: "Champaign",
    state: "IL",
    station_image:
      "https://media-exp1.licdn.com/dms/image/C4E0BAQGlh_vDeKpWIQ/company-logo_200_200/0/1521359015698?e=2147483647&v=beta&t=NDMNDJlDJXyrHEYyzJsVvSkGbmbveL-WBukDv-NqGx8",
    college_image:
      "https://b.fssta.com/uploads/application/college/team-logos/Illinois.png",
  },
  // {
  //   id: 15,
  //   call_sign: "KWVA",
  //   broadcast_frequency: "88.1 FM",
  //   audio_url: "http://kwvaradio.uoregon.edu:8000/stream/2/",
  //   station_url: "https://kwva.uoregon.edu/",
  //   college_name: "University of Oregon",
  //   public_private: "Public",
  //   city: "Eugene",
  //   state: "OR",
  //   station_image:
  //     "https://i3.radionomy.com/radios/400/c9d7f1d5-24ed-45e7-b0dd-8fbdd20528e0.jpg",
  //   college_image:
  //     "https://assets-sports.thescore.com/football/team/514/logo.png",
  // },
  {
    id: 15,
    call_sign: "KUNM",
    broadcast_frequency: "89.9 FM",
    audio_url: "https://19273.live.streamtheworld.com/KUNMFM_128.mp3",
    station_url: "https://www.kunm.org/",
    college_name: "University of New Mexico",
    public_private: "Public",
    city: "Albuquerque",
    state: "NM",
    station_image:
      "https://dbs.radioline.fr/pictures/radio_f9e336e70016db25b63ef34b980b8f59/logo200.jpg?size=200",
    college_image:
      "https://coursera-university-assets.s3.amazonaws.com/8b/80ffc01f5011e5bac7a71557814a9f/UNM_Logo_Vert_Coursera.png",
  },
  {
    id: 15,
    call_sign: "WWVU",
    broadcast_frequency: "91.7 FM",
    audio_url:
      "http://n0a.radiojar.com/56p3rt9eytzuv?1665850857=&rj-tok=AAABg9x8ZxMAGQavy8qgdTpyMQ&rj-ttl=5",
    station_url: "https://u92themoose.com/",
    college_name: "University of West Virginia",
    public_private: "Public",
    city: "Morgantown",
    state: "WV",
    station_image:
      "https://cdn-profiles.tunein.com/s23884/images/logog.png?t=159614",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/West_Virginia_Mountaineers_logo.svg/175px-West_Virginia_Mountaineers_logo.svg.png",
  },
  {
    id: 16,
    call_sign: "KAMP",
    broadcast_frequency: "1570 AM",
    audio_url: "https://ice42.securenetsystems.net/KAMP",
    station_url: "https://www.kampstudentradio.com/",
    college_name: "University of Arizona",
    public_private: "Public",
    city: "Tucson",
    state: "AZ",
    station_image:
      "https://static.mytuner.mobi/media/tvos_radios/uzkpp2kqse7c.jpg",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Arizona_Wildcats_logo.svg/200px-Arizona_Wildcats_logo.svg.png",
  },
];

export default stations;
