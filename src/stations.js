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
    palette: ["#a4c0e4", "#263663", "#5e6687", "#6c7491"],
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
    palette: ["#092f63", "#f2c134", "#fcf9f3", "#4e566c"],
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
    palette: ["#d46c2c", "#d86c2c", "#d86c2c", "#d86c2c"],
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
    palette: ["#a30505", "#f9f7f7", "#0c0707", "#b17c7c"],
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
    palette: ["#edc96f", "#120f07", "#9d988a", "#7c7c7c"],
  },
  {
    id: 17,
    call_sign: "KAMP",
    broadcast_frequency: "1570",
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
    palette: ["#05255d", "#faf9fa", "#bd0f3e", "#dc7c94"],
  },
  {
    id: 19,
    call_sign: "WDBM",
    broadcast_frequency: "88.9",
    audio_url:
      "https://cors-proxy.elfsight.com/http://play.impact89fm.org:8000/impact89fm",
    station_url: "https://impact89fm.org/",
    college_name: "Michigan State University",
    public_private: "Public",
    city: "East Lansing",
    state: "MI",
    station_image:
      "https://impact89fm.org/wp-content/uploads/2015/03/MainLogo-300x3001.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Michigan_State_Athletics_logo.svg/1200px-Michigan_State_Athletics_logo.svg.png",
    palette: ["#1c443c", "#14443c", "#20443c", "#20443c"],
  },
  {
    id: 14,
    call_sign: "WPGU",
    broadcast_frequency: "107.1",
    audio_url:
      "https://cors-proxy.elfsight.com/http://ice64.securenetsystems.net/WPGUFM",
    station_url: "http://illinimedia.org/",
    college_name: "University of Illinois-Urbana-Champaign",
    public_private: "Public",
    city: "Champaign",
    state: "IL",
    station_image:
      "https://media-exp1.licdn.com/dms/image/C4E0BAQGlh_vDeKpWIQ/company-logo_200_200/0/1521359015698?e=2147483647&v=beta&t=NDMNDJlDJXyrHEYyzJsVvSkGbmbveL-WBukDv-NqGx8",
    college_image:
      "https://b.fssta.com/uploads/application/college/team-logos/Illinois.png",
    palette: ["#eb4b24", "#142c4c", "#65383f", "#342c44"],
  },
  {
    id: 16,
    call_sign: "WWVU",
    broadcast_frequency: "91.7",
    audio_url:
      "https://cors-proxy.elfsight.com/http://n0a.radiojar.com/56p3rt9eytzuv?1665850857=&rj-tok=AAABg9x8ZxMAGQavy8qgdTpyMQ&rj-ttl=5",
    station_url: "https://u92themoose.com/",
    college_name: "West Virginia University",
    public_private: "Public",
    city: "Morgantown",
    state: "WV",
    station_image:
      "https://cdn-profiles.tunein.com/s23884/images/logog.png?t=159614",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/West_Virginia_Mountaineers_logo.svg/175px-West_Virginia_Mountaineers_logo.svg.png",
    palette: ["#042c54", "#042454", "#082c54", "#082c54"],
  },
  {
    id: 18,
    call_sign: "KFJC",
    broadcast_frequency: "89.7",
    audio_url:
      "https://cors-proxy.elfsight.com/http://netcast.kfjc.org/kfjc-128k-mp3",
    station_url: "https://kfjc.org/",
    college_name: "Foothill College",
    public_private: "Public",
    city: "Los Altos Hills",
    state: "CA",
    station_image:
      "https://kfjc.org/static/images/logos/classic.color.gifs/classic.color.600x470.gif",
    college_image:
      "https://www.wemakescholars.com/admin/uploads/providers/fiG-Xq69emSoKM8DaEpfSu42f90Mo11c.png",
    palette: ["#ac1c2c", "#8e1c24", "#b4202c", "#b02028"],
  },
  {
    id: 26,
    call_sign: "WVFS",
    broadcast_frequency: "89.7",
    audio_url:
      "https://cors-proxy.elfsight.com/http://voice.wvfs.fsu.edu:8000/stream",
    station_url: "https://wvfs.fsu.edu/",
    college_name: "Florida State University",
    public_private: "Public",
    city: "Tallahassee",
    state: "FL",
    station_image:
      "https://naccchart.com/wp-content/uploads/2022/03/wvfs-hi-res_350.jpg",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Florida_State_Seminoles_logo.svg/1200px-Florida_State_Seminoles_logo.svg.png",
    palette: ["#452d34", "#ede8db", "#b0a79a", "#b9929c"],
  },
  {
    id: 28,
    call_sign: "WUOG",
    broadcast_frequency: "90.5",
    audio_url:
      "https://cors-proxy.elfsight.com/http://stream.wuog.org:8000/stream",
    station_url: "http://wuog.org/",
    college_name: "University of Georgia",
    public_private: "Public",
    city: "Athens",
    state: "GA",
    station_image:
      "https://bloximages.newyork1.vip.townnews.com/redandblack.com/content/tncms/assets/v3/editorial/6/23/623c3abe-acc1-11e4-ace3-3f1d40ac2f84/54d2a4c19933a.image.jpg?resize=400%2C400",
    college_image:
      "https://content.sportslogos.net/logos/31/687/full/georgia_bulldogs_logo_secondary_2015_sportslogosnet-7979.png",
    palette: ["#040404", "#fafafa", "#af1531", "#848484"],
  },
  {
    id: 8,
    call_sign: "WXTJ",
    broadcast_frequency: "100.1",
    audio_url:
      "https://cors-proxy.elfsight.com/https://streams.wtju.net:8443/wtjx-opus-256.ogg",
    station_url: "https://www.wxtj.fm/",
    college_name: "University of Virginia",
    public_private: "Public",
    city: "Charlottesville",
    state: "VA",
    station_image:
      "https://upload.wikimedia.org/wikipedia/en/5/50/WXTJ-LP_2015.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Virginia_Cavaliers_logo.svg/800px-Virginia_Cavaliers_logo.svg.png",
    palette: ["#fb5714", "#0f3057", "#6a3b37", "#4a353c"],
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
      "https://static.mytuner.mobi/media/tvos_radios/kNFMSSg6QR.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/a/a8/W%26L_Generals.png",
    palette: ["#093698", "#e6e8ea", "#0e0e0e", "#799fc2"],
  },
  {
    id: 10,
    call_sign: "WTBU",
    broadcast_frequency: "89.3",
    audio_url: "https://cors-proxy.elfsight.com/http://wtbu.bu.edu:1800/",
    station_url: "https://sites.bu.edu/wtbu/",
    college_name: "Boston University",
    public_private: "private",
    city: "Boston",
    state: "MA",
    station_image:
      "https://i1.sndcdn.com/avatars-000070779841-52d5la-t500x500.jpg",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Boston_University_Terriers_logo.svg/800px-Boston_University_Terriers_logo.svg.png",
    palette: ["#ba0613", "#070606", "#f1eff0", "#857c7c"],
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
    palette: ["#fcc404", "#ffc404", "#ffc404", "#ffc404"],
  },
  {
    id: 4,
    call_sign: "WCBN",
    broadcast_frequency: "88.3",
    audio_url:
      "https://cors-proxy.elfsight.com/http://floyd.wcbn.org:8000/wcbn-hd.mp3",
    station_url: "http://www.wcbn.org/",
    college_name: "University of Michigan",
    public_private: "public",
    city: "Ann Arbor",
    state: "MI",
    station_image:
      "https://pbs.twimg.com/profile_images/1362092476375310338/ApUeoD54_400x400.jpg",
    college_image: "https://cdn.d1baseball.com/logos/teams/256/michigan.png",
    palette: ["#fcd304", "#fcdc04", "#fcd414", "#f4cc04"],
  },
  {
    id: 5,
    call_sign: "WUTK",
    broadcast_frequency: "90.3",
    audio_url:
      "https://cors-proxy.elfsight.com/http://streamer.cci.utk.edu:8000/wutk",
    station_url: "https://wutkradio.com/",
    college_name: "University of Tennessee, Knoxville",
    public_private: "Public",
    city: "Knoxville",
    state: "TN",
    station_image: "https://cdn-radiotime-logos.tunein.com/s23442g.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Tennessee_Volunteers_logo.svg/1200px-Tennessee_Volunteers_logo.svg.png",
    palette: ["#fc8404", "#ff8404", "#ff8404", "#ff8404"],
  },
  {
    id: 12,
    call_sign: "WKNC",
    broadcast_frequency: "88.1",
    audio_url:
      "https://cors-proxy.elfsight.com/http://173.193.205.96:7430/stream",
    station_url: "https://wknc.org/",
    college_name: "North Carolina State University",
    public_private: "Public",
    city: "Raleigh",
    state: "NC",
    station_image:
      "https://storage.googleapis.com/stateless-wknc-org/sites/1/2020/10/wknc881-bow.png",
    college_image:
      "https://trademarks.ncsu.edu/wp-content/uploads/2016/04/cropped-brick-s-1.png",
    palette: ["#cb262e", "#0c0c0e", "#f6f3f3", "#ec8c9c"],
  },
  {
    id: 13,
    call_sign: "WRUV",
    broadcast_frequency: "90.1",
    audio_url:
      "https://cors-proxy.elfsight.com/http://icecast.uvm.edu:8005/wruv_fm_128",
    station_url: "http://wruv.org/",
    college_name: "University of Vermont",
    public_private: "Public",
    city: "Burlington",
    state: "VT",
    station_image: "https://cdn-radiotime-logos.tunein.com/s22632g.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/34/Vermont_Catamounts_logo.svg/1200px-Vermont_Catamounts_logo.svg.png",
    palette: ["#053c0f", "#9d5e0f", "#f7d15c", "#7b8c0c"],
  },
  {
    id: 15,
    call_sign: "KWVA",
    broadcast_frequency: "88.1",
    audio_url:
      "https://cors-proxy.elfsight.com/http://kwvaradio.uoregon.edu:8000/stream/2/",
    station_url: "https://kwva.uoregon.edu/",
    college_name: "University of Oregon",
    public_private: "Public",
    city: "Eugene",
    state: "OR",
    station_image:
      "https://i3.radionomy.com/radios/400/c9d7f1d5-24ed-45e7-b0dd-8fbdd20528e0.jpg",
    college_image:
      "https://assets-sports.thescore.com/football/team/514/logo.png",
    palette: ["#f2eb1c", "#176a42", "#7da434", "#97b62e"],
  },
  {
    id: 27,
    call_sign: "KUNM",
    broadcast_frequency: "89.9",
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
    palette: ["#7b7980", "#cc1344", "#f8f7f7", "#bab4bc"],
  },
  {
    id: 20,
    call_sign: "WUVT",
    broadcast_frequency: "90.7",
    audio_url: "https://stream.wuvt.vt.edu/wuvt-hq.aac",
    station_url: "https://www.wuvt.vt.edu/",
    college_name: "Virginia Tech",
    public_private: "Public",
    city: "Blacksburg",
    state: "VA",
    station_image: "https://cdn-radiotime-logos.tunein.com/s23449g.png",
    college_image:
      "https://play-lh.googleusercontent.com/NUZcBH8TGuqTuP_zsaEzXC747k8IXyTUQ83nkP0voWgCFbVBItRuv0XwymzHuGZakZM",
    palette: ["#a2392c", "#fbfafa", "#ad8790", "#b4949c"],
  },
  {
    id: 21,
    call_sign: "WHUS",
    broadcast_frequency: "91.7",
    audio_url:
      "https://cors-proxy.elfsight.com/http://stream.whus.org:8000/whusfm",
    station_url: "https://whus.org/",
    college_name: "University of Connecticut",
    public_private: "Public",
    city: "Mansfield",
    state: "CT",
    station_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHP4z0afknHEtpmHaK5x7mjIm8QNwPSXOo0v1uOfZ0PxX-ex5TBEqGBGP3byvnvwhEUKM&usqp=CAU",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Connecticut_Huskies_logo.svg/1200px-Connecticut_Huskies_logo.svg.png",
    palette: ["#040c2c", "#eceded", "#e2042c", "#7793ac"],
  },
  {
    id: 22,
    call_sign: "KMNR",
    broadcast_frequency: "89.7",
    audio_url: "https://boombox.kmnr.org/webstream.mp3",
    station_url: "https://kmnr.org/",
    college_name: "Missouri University of Science and Technology",
    public_private: "",
    city: "Rolla",
    state: "MO",
    station_image:
      "https://www.radio.net/images/broadcasts/a5/7b/31601/c300.png",
    college_image:
      "https://www.pinclipart.com/picdir/big/76-766936_mascot-marks-missouri-s-t-athletics-logo-clipart.png",
    palette: ["#eae1cf", "#055535", "#8aa274", "#7cac9c"],
  },
  {
    id: 23,
    call_sign: "WRPI",
    broadcast_frequency: "91.5",
    audio_url:
      "https://cors-proxy.elfsight.com/http://icecast1.wrpi.org:8000/mp3-256.mp3",
    station_url: "https://www.wrpi.org/",
    college_name: "Rensselaer Polytechnic Institute",
    public_private: "Private",
    city: "Troy",
    state: "NY",
    station_image:
      "http://images.radio.orange.com/radios/large_wrpi_915_fm_troy_ny.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/RPI_Engineers.svg/1200px-RPI_Engineers.svg.png",
    palette: ["#e3241c", "#242424", "#70241d", "#96241c"],
  },
  {
    id: 24,
    call_sign: "KZUU",
    broadcast_frequency: "90.7",
    audio_url: "https://ice8.securenetsystems.net/KZUU",
    station_url: "https://kzuu.org/",
    college_name: "Washington State University",
    public_private: "Public",
    city: "Pullman",
    state: "WA",
    station_image:
      "https://kzuuorg.files.wordpress.com/2019/03/cropped-full-logo-final-2018.png?w=300",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Washington_State_Cougars_logo.svg/800px-Washington_State_Cougars_logo.svg.png",
    palette: ["#fbfafa", "#9c1c34", "#bf727f", "#cc8c9c"],
  },
  {
    id: 25,
    call_sign: "KSPC",
    broadcast_frequency: "88.7",
    audio_url: "https://kspc.radioca.st/stream",
    station_url: "https://kspc.org/",
    college_name: "Claremont Colleges",
    public_private: "Private",
    city: "Claremont",
    state: "CA",
    station_image: "https://kspc.org/wp-content/uploads/2019/10/brand-2.jpg",
    college_image:
      "https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/17.png",
    palette: ["#f5c20d", "#850904", "#f4df7a", "#bc5c1c"],
  },
  {
    id: 29,
    call_sign: "KXUA",
    broadcast_frequency: "88.3",
    audio_url:
      "https://cors-proxy.elfsight.com/http://listen.uark.edu:8830/;?type=http",
    station_url: "https://kxua.uark.edu/",
    college_name: "University of Arkansas",
    public_private: "Public",
    city: "Fayetteville",
    state: "AR",
    station_image:
      "https://spinitron.com/images/Station/13/1389-img_logo.225x225.jpg?v=1568071394",
    college_image:
      "http://sportslogohistory.com/wp-content/uploads/2018/09/arkansas_razorbacks_2014-pres.png",
    palette: ["#9d2233", "#13090b", "#c7c7c7", "#8c8c8c"],
  },
  {
    id: 30,
    call_sign: "KZSC",
    broadcast_frequency: "88.1",
    audio_url: "https://kzscfms1-geckohost.radioca.st/kzschigh",
    station_url: "https://kzsc.org/",
    college_name: "University of California, Santa Cruz",
    public_private: "Public",
    city: "Santa Cruz",
    state: "CA",
    station_image:
      "https://kzsc.org/wp-content/uploads/2022/04/sticker-richarddjames.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d8/SDS_UCSantaCruz_RedwoodSlug_WhiteGround.png",
    palette: ["#fbcc07", "#04143c", "#7c6444", "#6e7084"],
  },
  {
    id: 31,
    call_sign: "WVUM",
    broadcast_frequency: "90.5",
    audio_url: "https://s7.voscast.com:8693/stream",
    station_url: "https://www.wvum.org/",
    college_name: "University of Miami",
    public_private: "Private",
    city: "Miami",
    state: "FL",
    station_image:
      "https://images.squarespace-cdn.com/content/v1/5a822acff09ca44ad247aaea/1531168670297-OSO6W5VE5M51YU4E3X07/static1.squarespace.png",
    college_image:
      "https://a5e8126a499f8a963166-f72e9078d72b8c998606fd6e0319b679.ssl.cf5.rackcdn.com/images/sports-leagues/ncaa-acc-miami-logo.png",
    palette: ["#f35b04", "#045333", "#f8f6f3", "#689484"],
  },
  {
    id: 32,
    call_sign: "KFSR",
    broadcast_frequency: "90.7",
    audio_url:
      "https://cors-proxy.elfsight.com/http://129.8.40.34:8000//;;nop.mp3",
    station_url: "http://kfsr.org/",
    college_name: "California State University, Fresno",
    public_private: "Public",
    city: "Fresno",
    state: "CA",
    station_image: "http://kfsr.org/wp-content/themes/kfsr/images/logo.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Fresno_State_Bulldogs_baseball_logo.svg/1118px-Fresno_State_Bulldogs_baseball_logo.svg.png",
    palette: ["#142b4b", "#c31434", "#7d1c3c", "#9d1635"],
  },
  {
    id: 33,
    call_sign: "WSBF",
    broadcast_frequency: "88.1",
    audio_url: "https://wsbf.net/stream/high",
    station_url: "https://wsbf.net/#!/",
    college_name: "Clemson University",
    public_private: "Public",
    city: "Clemson",
    state: "SC",
    station_image: "https://wsbf.net/images/wsbflady_250.png",
    college_image:
      "https://sportslogohistory.com/wp-content/uploads/2018/01/clemson_tigers_1977-pres_s.png",
    palette: ["#f36b2c", "#532780", "#6f4d9b", "#fcbfa5"],
  },
  {
    id: 34,
    call_sign: "WREK",
    broadcast_frequency: "91.1",
    audio_url:
      "https://cors-proxy.elfsight.com/http://streaming.wrek.org:8000/wrek_live-128kb",
    station_url: "https://www.wrek.org/",
    college_name: "Georgia Institute of Technology",
    public_private: "Public",
    city: "Atlanta",
    state: "GA",
    station_image: "https://avatars3.githubusercontent.com/u/2118908?s=280&v=4",
    college_image: "https://content.sportslogos.net/logos/31/690/full/2491.gif",
    palette: ["#251d1d", "#e8b12c", "#f6f6f6", "#6c6c6c"],
  },
  {
    id: 36,
    call_sign: "CITR",
    broadcast_frequency: "101.9",
    audio_url: "https://live.citr.ca/live.aac",
    station_url: "https://www.citr.ca/",
    college_name: "University of British Columbia",
    public_private: "Public",
    city: "Vancouver",
    state: "BC",
    station_image:
      "https://d3wo5wojvuv7l.cloudfront.net/t_twitter_card/images.spreaker.com/original/96ede5aff67a67e3dac827c52c7bd2f6.jpg",
    college_image:
      "https://www.volleyballbc.org/wp-content/uploads/2018/08/ubc-logo-png-transparent.png",
    palette: ["#d4b42c", "#24246c", "#acb84c", "#50704c"],
  },
  {
    id: 37,
    call_sign: "WTUL",
    broadcast_frequency: "91.5",
    audio_url:
      "https://cors-proxy.elfsight.com/http://129.81.156.83:8000/stream",
    station_url: "https://www.wtulneworleans.com/",
    college_name: "Tulane University",
    public_private: "Private",
    city: "New Orleans",
    state: "LA",
    station_image:
      "https://i1.sndcdn.com/avatars-000107068841-z5wmaw-t500x500.jpg",
    college_image:
      "https://content.sportslogos.net/logos/34/877/full/tulane_green_wave_logo_primary_1986_sportslogosnet-7875.png",
    palette: ["#fbfbfb", "#04644c", "#43c3e3", "#74ac9c"],
  },
  {
    id: 38,
    call_sign: "KDVS",
    broadcast_frequency: "90.3",
    audio_url: "https://archives.kdvs.org/stream",
    station_url: "https://kdvs.org/",
    college_name: "University of California, Davis",
    public_private: "Public",
    city: "Davis",
    state: "CA",
    station_image:
      "https://www.radio.net/images/broadcasts/e0/ec/29376/c175.png",
    college_image:
      "https://content.sportslogos.net/logos/30/1831/full/california_davis_aggies_logo_primary_1959_sportslogosnet-8865.png",
    palette: ["#042c53", "#cb9304", "#9c7c14", "#6c6628"],
  },
  {
    id: 39,
    call_sign: "WUCF",
    broadcast_frequency: "89.9",
    audio_url: "https://peridot.streamguys1.com:7835/WUCF",
    station_url: "https://www.wucf.org/",
    college_name: "University of Central Florida",
    public_private: "Public",
    city: "Orlando",
    state: "FL",
    station_image:
      "https://d1qbemlbhjecig.cloudfront.net/prod/filer_public/wucf-bento-live-pbs/2020%20Logo/cb416156b9_89.9-circle-logo-black.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/UCF_Knights_logo.svg/1200px-UCF_Knights_logo.svg.png",
    palette: ["#040404", "#b3a36c", "#fbfbfb", "#5c4c34"],
  },
  {
    id: 40,
    call_sign: "WERS",
    broadcast_frequency: "88.9",
    audio_url: "https://24413.live.streamtheworld.com/WERSFM_SC",
    station_url: "https://wers.org/",
    college_name: "Emerson College",
    public_private: "Private",
    city: "Boston",
    state: "MA",
    station_image:
      "https://wers.org/wp-content/uploads/2017/12/WERS_socialmedia_nowaves-04.png",
    college_image:
      "https://teamcolorcodes.com/wp-content/uploads/2022/06/Emerson-College-Lions-logo-1.png",
    palette: ["#facb37", "#252424", "#7d7553", "#846c2c"],
  },
  {
    id: 41,
    call_sign: "WKPS",
    broadcast_frequency: "90.7",
    audio_url:
      "https://n0a.radiojar.com/k9uw1tyr7x8uv?rj-ttl=5&rj-tok=AAABhCVt97AAAWGizcTmTKqRJQ",
    station_url: "https://www.thelion.fm/",
    college_name: "Penn State University",
    public_private: "Public",
    city: "State College",
    state: "PA",
    station_image:
      "https://www.radio.net/images/broadcasts/10/84/28658/c300.png",
    college_image: "https://gopsusports.com/images/logos/site/site.png",
    palette: ["#f2f3f6", "#062d64", "#7c8cb2", "#7182ac"],
  },
  {
    id: 42,
    call_sign: "KZSU",
    broadcast_frequency: "90.1",
    audio_url:
      "https://cors-proxy.elfsight.com/http://kzsu-streams.stanford.edu/kzsu-1-128.mp3",
    station_url: "http://kzsu.stanford.edu/",
    college_name: "Stanford University",
    public_private: "Private",
    city: "Stanford",
    state: "CA",
    station_image:
      "https://static.mytuner.mobi/media/tvos_radios/JvbcgbfZAj.png",
    college_image:
      "http://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png",
    palette: ["#8d1616", "#e9e4e4", "#057464", "#c4848c"],
  },
  {
    id: 43,
    call_sign: "WPRB",
    broadcast_frequency: "103.3",
    audio_url: "https://wprb.streamguys1.com/live",
    station_url: "https://wprb.com/",
    college_name: "Princeton University",
    public_private: "Private",
    city: "Princeton",
    state: "NJ",
    station_image:
      "https://playlists.wprb.com/images/Station/18/1895-img_logo.225x225.png?v=1621258861",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Princeton_Tigers_logo.svg/895px-Princeton_Tigers_logo.svg.png",
    palette: ["#040404", "#fb6304", "#fbfafa", "#999898"],
  },
  {
    id: 44,
    call_sign: "KTCU",
    broadcast_frequency: "88.7",
    audio_url:
      "https://cors-proxy.elfsight.com/http://ktcustream01.is.tcu.edu/ktcu",
    station_url: "https://ktcu.tcu.edu/",
    college_name: "Texas Christian University",
    public_private: "",
    city: "Fort Worth",
    state: "TX",
    station_image:
      "https://www.radio.net/images/broadcasts/5e/db/17703/2/c300.png",
    college_image:
      "https://sportslogohistory.com/wp-content/uploads/2021/07/tcu_horned_frogs_1994-1997.png",
    palette: ["#542c6c", "#582c6c", "#582c6c", "#582c6c"],
  },
  {
    id: 45,
    call_sign: "CFUV",
    broadcast_frequency: "101.9",
    audio_url: "https://ais-sa1.streamon.fm/7132_64k.aac",
    station_url: "http://cfuv.uvic.ca/cms/",
    college_name: "University of Victoria",
    public_private: "Public",
    city: "Victoria",
    state: "BC",
    station_image:
      "https://i1.sndcdn.com/avatars-000445307787-562tuu-t500x500.jpg",
    college_image:
      "https://apply.educationplannerbc.ca/assets/institutions/uvic/logo/UVIC_logo.png",
    palette: ["#f5dcd3", "#292129", "#8aa6d0", "#2371b1"],
  },
  {
    id: 46,
    call_sign: "CHUO",
    broadcast_frequency: "89.1",
    audio_url: "https://stream.statsradio.com:8102/stream",
    station_url: "https://chuo.fm/",
    college_name: "University of Ottawa",
    public_private: "Public",
    city: "Ottawa",
    state: "ON",
    station_image:
      "https://chuo.fm/wp-content/uploads/2017/03/CHUO-Logo-web600x600-06.png",
    college_image:
      "http://www.uottawa.ca/brand/sites/www.uottawa.ca.brand/files/uottawa_ver_black.png",
    palette: ["#040404", "#080404", "#080404", "#080404"],
  },
  {
    id: 47,
    call_sign: "KOLN",
    broadcast_frequency: "100.0",
    audio_url: "https://live.koelncampus.com/live",
    station_url: "https://www.koelncampus.com/",
    college_name: "University of Cologne",
    public_private: "Public",
    city: "Cologne",
    state: "Germany",
    station_image:
      "https://pbs.twimg.com/profile_images/999195818480488449/zT5K6ZFh_400x400.jpg",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/SiegelUniK%C3%B6ln.svg/1200px-SiegelUniK%C3%B6ln.svg.png",
    palette: ["#447ca4", "#f6f8f9", "#85a7c5", "#9cbccc"],
  },
  {
    id: 48,
    call_sign: "WHRB",
    broadcast_frequency: "95.3",
    audio_url: "https://stream.whrb.org/whrb-he-aac",
    station_url: "https://www.whrb.org/",
    college_name: "Harvard University",
    public_private: "Private",
    city: "Cambridge",
    state: "MA",
    station_image:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple118/v4/07/c5/8a/07c58abd-ce85-0f16-e320-fe29fe92f960/source/512x512bb.jpg",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png",
    palette: ["#151d24", "#f9f9f9", "#a6883c", "#a31c33"],
  },
  {
    id: 49,
    call_sign: "WUML",
    broadcast_frequency: "91.5",
    audio_url:
      "https://cors-proxy.elfsight.com/http://cp12.shoutcheap.com:8306/stream",
    station_url: "https://www.wuml.org/",
    college_name: "University of Massachusetts Lowell",
    public_private: "Public",
    city: "Lowell",
    state: "MA",
    station_image:
      "https://images.squarespace-cdn.com/content/v1/5d755b2788fb8857b5fb99af/94762cdb-a49f-4324-9817-f46094bb10da/Covid+WUML+Logo+with+shadow.png",
    college_image:
      "https://goriverhawks.com/images/2021/8/20/PrimaryLogo_NoStroke.png",
    palette: ["#056bb3", "#d32434", "#f9fafb", "#74acd4"],
  },
  {
    id: 50,
    call_sign: "KTUH",
    broadcast_frequency: "90.1",
    audio_url: "https://stream.ktuh.org:8001/stream",
    station_url: "https://ktuh.org/",
    college_name: "University of Hawaii at Manoa",
    public_private: "Public",
    city: "Manoa",
    state: "HI",
    station_image: "https://www.pritchettcartoons.com/logos/ktuh.jpg",
    college_image: "https://hawaiiathletics.com/images/logos/v13.png",
    palette: ["#d7d8db", "#194634", "#86ac9c", "#8cb4a4"],
  },
  {
    id: 51,
    call_sign: "KTRU",
    broadcast_frequency: "96.1",
    audio_url: "https://ice41.securenetsystems.net/KTRU64M",
    station_url: "https://ktru.org/",
    college_name: "Rice University",
    public_private: "Private",
    city: "Houston",
    state: "TX",
    station_image: "https://cdn-radiotime-logos.tunein.com/s257013g.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Rice_Owls_logo.svg/1200px-Rice_Owls_logo.svg.png",
    palette: ["#04245c", "#041c5c", "#08245c", "#08245c"],
  },
  {
    id: 52,
    call_sign: "KURE",
    broadcast_frequency: "88.5",
    audio_url:
      "https://cors-proxy.elfsight.com/http://kure-network.stuorg.iastate.edu:8000/KUREBroadcast",
    station_url: "https://kure.stuorg.iastate.edu/",
    college_name: "Iowa State University",
    public_private: "Public",
    city: "Ames",
    state: "IA",
    station_image:
      "https://i1.sndcdn.com/avatars-000131375076-3zgb62-t500x500.jpg",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Iowa_State_Cyclones_logo.svg/640px-Iowa_State_Cyclones_logo.svg.png",
    palette: ["#8e2334", "#fbd03f", "#cd7332", "#bc844c"],
  },
  {
    id: 53,
    call_sign: "WVJC",
    broadcast_frequency: "89.1",
    audio_url: "https://server02.nkstreaming.com:8122/stream",
    station_url: "http://www.bashradio.com/",
    college_name: "Wabash Valley College",
    public_private: "Public",
    city: "Mount Carmel",
    state: "IL",
    station_image:
      "https://static.wixstatic.com/media/6ed5e9_8981c37b2ed84fed82e0692f6b08a37c~mv2.png/v1/crop/x_81,y_70,w_624,h_472/fill/w_560,h_424,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/The%20BASH%20Logo.png",
    college_image:
      "https://gomcpanthers.com/images/logos/wabash_valley_logo.png?width=200&height=200",
    palette: ["#120d0e", "#ec163c", "#869c9f", "#747474"],
  },
  {
    id: 55,
    call_sign: "KCSU",
    broadcast_frequency: "90.5",
    audio_url: "https://listen.creek.org/kcsu",
    station_url: "https://kcsufm.com/",
    college_name: "Colorado State University",
    public_private: "Public",
    city: "Fort Collins",
    state: "CO",
    station_image:
      "https://upload.wikimedia.org/wikipedia/commons/3/37/KCSU_logo-Multi_SP2022_%281%29.png",
    college_image:
      "https://brand.colostate.edu/wp-content/uploads/sites/47/2019/01/CSU-Ram-357.png",
    palette: ["#1c4c2c", "#fbfbfb", "#8ca494", "#9cb4a4"],
  },
  {
    id: 57,
    call_sign: "WMUC",
    broadcast_frequency: "90.5",
    audio_url: "http://wmuc.umd.edu:8000/wmuc-hq",
    station_url: "http://www.wmuc.umd.edu/",
    college_name: "University of Maryland",
    public_private: "Public",
    city: "College Park",
    state: "MD",
    station_image:
      "https://pbs.twimg.com/profile_images/910138549835530240/wBQGp9Nt_400x400.jpg",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Maryland_Terrapins_logo.svg/1200px-Maryland_Terrapins_logo.svg.png",
    palette: ["#e31c33", "#040404", "#fbd617", "#bc8c94"],
  },
  {
    id: 58,
    call_sign: "KCPR",
    broadcast_frequency: "91.3",
    audio_url: "https://ice9.securenetsystems.net/KCPR1",
    station_url: "https://kcpr.org/",
    college_name: "Calfornia Polytechnic State University, San Luis Obispo",
    public_private: "Public",
    city: "San Luis Obispo",
    state: "CA",
    station_image:
      "https://alexullrich.files.wordpress.com/2013/05/kcpr_logo_matthew_schwartz_bw.jpg?w=640",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/2/29/Calpolylogosports.png",
    palette: ["#063d34", "#eacf83", "#fafaf8", "#89784d"],
  },
  {
    id: 59,
    call_sign: "WVUD",
    broadcast_frequency: "91.3",
    audio_url:
      "https://cors-proxy.elfsight.com/http://128.175.76.123:8000/stream/1/",
    station_url: "https://www.wvud.org/",
    college_name: "University of Delaware",
    public_private: "Public",
    city: "Newark",
    state: "DE",
    station_image: "https://www.wvud.org/files/2017/04/cropped-WVUD600600.jpg",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0a/University_of_Delaware_Wordmark.png",
    palette: ["#096ead", "#fbdc05", "#f2f6f5", "#78a05c"],
  },
  {
    id: 60,
    call_sign: "WNSB",
    broadcast_frequency: "91.1",
    audio_url:
      "https://cors-proxy.elfsight.com/http://27033.live.streamtheworld.com:3690/WNSBFM.mp3",
    station_url: "https://www.nsu.edu/WNSB",
    college_name: "Norfolk State University",
    public_private: "Public",
    city: "Norfolk",
    state: "VA",
    station_image:
      "http://cdn-profiles.tunein.com/s21544/images/logod.png?t=637800282700000000",
    college_image:
      "https://content.sportslogos.net/logos/33/774/full/norfolk_state_spartans_logo_secondary_19991057.png",
    palette: ["#047c54", "#fbfbfa", "#f3a405", "#74b49c"],
  },
  {
    id: 61,
    call_sign: "WRAS",
    broadcast_frequency: "88.5",
    audio_url:
      "https://cors-proxy.elfsight.com/http://22113.live.streamtheworld.com/WRASFM_SC",
    station_url: "https://wras.org/",
    college_name: "Georgia State University",
    public_private: "Public",
    city: "Atlanta",
    state: "GA",
    station_image:
      "https://upload.wikimedia.org/wikipedia/en/a/ae/WRAS_Logo.png",
    college_image:
      "https://commkit.gsu.edu/files/2021/05/GSU-Athletics-Primary-3C-RGB.png",
    palette: ["#e7bbc8", "#043ca4", "#6484cc", "#2a59b5"],
  },
  {
    id: 62,
    call_sign: "KXLU",
    broadcast_frequency: "88.9",
    audio_url: "https://kxlu.streamguys1.com/kxlu-hi",
    station_url: "https://kxlu.com/",
    college_name: "Loyola Marymount University",
    public_private: "Private",
    city: "Los Angeles",
    state: "CA",
    station_image:
      "http://cdn-profiles.tunein.com/s26509/images/logod.jpg?t=637919750680000000",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Loyola_Marymount_Lions_logo.svg/1200px-Loyola_Marymount_Lions_logo.svg.png",
    palette: ["#042c54", "#7c041c", "#b1b0b8", "#3f5a77"],
  },
  {
    id: 63,
    call_sign: "KTSW",
    broadcast_frequency: "89.9",
    audio_url: "https://ktswlive.txstate.edu:8102/listen",
    station_url: "https://ktsw.txst.edu/",
    college_name: "Texas State University",
    public_private: "Public",
    city: "San Marcos",
    state: "TX",
    station_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/KTSW_89.9.jpeg/220px-KTSW_89.9.jpeg",
    college_image:
      "https://www.txstate.edu/cache5775023272c6b91d422e57ec36e9f40a/imagehandler/scaler/gato-docs.its.txstate.edu/jcr:c11449cd-1dbd-494e-a0c3-f04efc16a480/Secondary_RGB_MRN-GLD.png?mode=fit&width=750",
    palette: ["#ab9353", "#541c1c", "#724531", "#84543c"],
  },
  {
    id: 64,
    call_sign: "CJIQ",
    broadcast_frequency: "88.3",
    audio_url: "https://conestoga.leanstream.co/CJIQFM-MP3",
    station_url: "https://www.cjiqfm.com/",
    college_name: "Conestoga College",
    public_private: "Public",
    city: "Kitchener",
    state: "ON",
    station_image:
      "https://cdn-profiles.tunein.com/s12240/images/logog.png?t=154158",
    college_image:
      "https://workforceplanningboard.org/wp-content/uploads/2020/03/Conestoga_College_logo.svg_-300x179-1.png",
    palette: ["#ba9a63", "#040404", "#6c5c3c", "#2c5434"],
  },
  {
    id: 66,
    call_sign: "KRUI",
    broadcast_frequency: "89.7",
    audio_url:
      "https://cors-proxy.elfsight.com/http://krui.student-services.uiowa.edu:8000/listen",
    station_url: "https://krui.fm/",
    college_name: "University of Iowa",
    public_private: "Public",
    city: "Iowa City",
    state: "IA",
    station_image:
      "https://upload.wikimedia.org/wikipedia/en/8/87/KRUI-FM_logo.jpg",
    college_image:
      "https://1000logos.net/wp-content/uploads/2021/06/Iowa-Hawkeyes-logo.png",
    palette: ["#fad40a", "#040404", "#04040c", "#7c6404"],
  },
  {
    id: 67,
    call_sign: "KUOM",
    broadcast_frequency: "100.7",
    audio_url:
      "https://cors-proxy.elfsight.com/http://radiokstreams.cce.umn.edu:8256/;?type=http",
    station_url: "https://www.radiok.org/",
    college_name: "University of Minnesota",
    public_private: "Public",
    city: "Minneapolis",
    state: "MN",
    station_image:
      "https://play-lh.googleusercontent.com/um-Go6BcxvbWvnMsZGe5ygqBDugKu1Dl8iqPywY2cqC3ywRmF0eVRJuxbvDl8Rmdp2M",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/University_of_Minnesota_Logo.svg/2560px-University_of_Minnesota_Logo.svg.png",
    palette: ["#fbcb33", "#7c041c", "#a84a24", "#bc5d24"],
  },
  {
    id: 68,
    call_sign: "WPTS",
    broadcast_frequency: "92.1",
    audio_url:
      "https://cors-proxy.elfsight.com/http://audio.wpts.pitt.edu:8000/wpts_live_128s.mp3",
    station_url: "https://wptsradio.org/",
    college_name: "University of Pittsburgh",
    public_private: "Public",
    city: "Pittsburgh",
    state: "PA",
    station_image:
      "https://wptsradio.org/wp-content/uploads/2015/12/WPTS-Square-Logo.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Pitt_Panthers_wordmark.svg/1200px-Pitt_Panthers_wordmark.svg.png",
    palette: ["#faba1c", "#043493", "#57626b", "#77745c"],
  },
  {
    id: 69,
    call_sign: "WMFO",
    broadcast_frequency: "91.5",
    audio_url:
      "https://cors-proxy.elfsight.com/http://webstream.wmfo.org/;?type=http",
    station_url: "https://www.wmfo.org/",
    college_name: "Tufts University",
    public_private: "Private",
    city: "Somerville",
    state: "MA",
    station_image:
      "https://upload.wikimedia.org/wikipedia/commons/7/79/WMFO_91.5FM_Station_Logo.jpg",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/2/22/Tufts_Jumbos_logo.png",
    palette: ["#c8c2bb", "#3c8cdb", "#89a6c7", "#66ace1"],
  },
  {
    id: 70,
    call_sign: "KRLX",
    broadcast_frequency: "88.1",
    audio_url:
      "https://cors-proxy.elfsight.com/http://137.22.31.174:8000/stream",
    station_url: "https://content.krlx.org/",
    college_name: "Carleton College",
    public_private: "Private",
    city: "Northfield",
    state: "MN",
    station_image:
      "https://upload.wikimedia.org/wikipedia/en/6/62/KRLXLogo.png",
    college_image:
      "https://athletics.carleton.edu/images/logos/Carleton-College.png",
    palette: ["#f2c848", "#10437f", "#8c9ca8", "#847c44"],
  },
  {
    id: 71,
    call_sign: "CKCU",
    broadcast_frequency: "93.1",
    audio_url: "https://stream2.statsradio.com:8124/stream",
    station_url: "https://www.ckcufm.com/",
    college_name: "Carleton University",
    public_private: "Public",
    city: "Ottawa",
    state: "ON",
    station_image: "https://cdn-radiotime-logos.tunein.com/s24763g.png",
    college_image:
      "https://imaginingfutures.world/wp-content/uploads/2021/02/carleton-university-boot-camp-logo.png",
    palette: ["#f9f9f9", "#090a0a", "#e43c3c", "#ec7c74"],
  },
  {
    id: 72,
    call_sign: "WUNH",
    broadcast_frequency: "91.3",
    audio_url:
      "https://cors-proxy.elfsight.com/http://s9.viastreaming.net:9000/;",
    station_url: "https://www.unh.edu/wunh/",
    college_name: "University of New Hampshire",
    public_private: "Public",
    city: "Durham",
    state: "NH",
    station_image:
      "https://pbs.twimg.com/media/EmGqlP1XEAI7mjr?format=jpg&name=large",
    college_image:
      "https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/160.png",
    palette: ["#06265d", "#dcddde", "#647494", "#687c94"],
  },
  {
    id: 73,
    call_sign: "WMSR",
    broadcast_frequency: "630",
    audio_url: "https://s2.radio.co/s20123bfa0/listen",
    station_url: "https://www.redhawkradio.com/",
    college_name: "Miami University",
    public_private: "Public",
    city: "Oxford",
    state: "OH",
    station_image:
      "https://se-images.campuslabs.com/clink/images/82dc7d8f-f40b-4487-b193-dec9779b3ecf95317a62-63ab-4d9b-8cc1-f2dadecf2b46.png?preset=med-sq",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Miami_Redhawks_logo.svg/1200px-Miami_Redhawks_logo.svg.png",
    palette: ["#040404", "#b31c2b", "#520d15", "#841422"],
  },
  {
    id: 74,
    call_sign: "WBRU",
    broadcast_frequency: "95.5",
    audio_url: "https://s3.radio.co/s115121de1/listen",
    station_url: "https://www.wbru.com/",
    college_name: "Brown University",
    public_private: "Private",
    city: "Providence",
    state: "RI",
    station_image:
      "https://freight.cargo.site/t/original/i/b86d671e692615bd0c7e33aeb217c4409de58622161d8f48523c5a4da7a9710b/logo-png.png",
    college_image:
      "https://rihebc.com/wp-content/uploads/2022/04/Brown_University.png",
    palette: ["#0a0909", "#e9e9e9", "#dc2128", "#747474"],
  },
  {
    id: 75,
    call_sign: "WZBC",
    broadcast_frequency: "90.3",
    audio_url:
      "https://cors-proxy.elfsight.com/http://amber.streamguys.com:4860/;stream/1",
    station_url: "https://www.wzbc.org/",
    college_name: "Boston College",
    public_private: "Private",
    city: "Newton",
    state: "MA",
    station_image: "https://upload.wikimedia.org/wikipedia/en/3/37/WZBC903.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Boston_College_Eagles_logo.svg/800px-Boston_College_Eagles_logo.svg.png",
    palette: ["#5e212d", "#ddceab", "#ac8c7b", "#948c8c"],
  },
  {
    id: 76,
    call_sign: "WIUP",
    broadcast_frequency: "90.1",
    audio_url:
      "https://cors-proxy.elfsight.com/http://144.80.16.164:8000/xstream",
    station_url: "http://www.wiupfm.org/",
    college_name: "Indiana University of Pennsylvania",
    public_private: "Public",
    city: "Indiana",
    state: "PA",
    station_image:
      "https://www.radio.net/images/broadcasts/81/e2/28619/c300.png",
    college_image:
      "https://www.iup.edu/_assets/images/footer/iup-artmark-crimson.png",
    palette: ["#9c1c34", "#a01c34", "#a01c34", "#a01c34"],
  },
  {
    id: 77,
    call_sign: "WRUW",
    broadcast_frequency: "91.1",
    audio_url: "https://wruw-stream.wruw.org/hls/stream.m3u8",
    station_url: "https://wruw.org/",
    college_name: "Case Western Reserve University",
    public_private: "Private",
    city: "Cleveland",
    state: "OH",
    station_image:
      "https://yt3.ggpht.com/ytc/AMLnZu9sBQKzhnyi-feCpAHK_LR8cxrkBPgA2OR3lVD3=s900-c-k-c0x00ffffff-no-rj",
    college_image:
      "https://upload.wikimedia.org/wikipedia/en/7/72/Case_Western_Reserve_University_Spartans_logo_mascot.png",
    palette: ["#223e4e", "#939ea6", "#738493", "#687c8c"],
  },
  {
    id: 78,
    call_sign: "CFRC",
    broadcast_frequency: "101.9",
    audio_url: "https://cors-proxy.elfsight.com/http://audio.cfrc.ca:8000/;",
    station_url: "https://www.cfrc.ca/",
    college_name: "Queen's University",
    public_private: "Public",
    city: "Kingston",
    state: "ON",
    station_image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0a/CFRC_Primary_Station_Logo.jpg",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Queen%27s_Golden_Gaels_Logo.svg/1200px-Queen%27s_Golden_Gaels_Logo.svg.png",
    palette: ["#fbbb14", "#09345a", "#bb1434", "#fcfbf8"],
  },
  {
    id: 79,
    call_sign: "KANM",
    broadcast_frequency: "88.1",
    audio_url: "https://kanm.tamu.edu/listen",
    station_url: "https://kanm.tamu.edu/#/",
    college_name: "Texas A&M University",
    public_private: "Public",
    city: "College Station",
    state: "TX",
    station_image: "https://kanm.tamu.edu/_assets/img/logo/trans_med.png",
    college_image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Texas_A%26M_University_logo.svg/1246px-Texas_A%26M_University_logo.svg.png",
    palette: ["#540404", "#fbfbfb", "#a47c7c", "#a47474"],
  },
  // Stability problem, won't load on mobile or desktop with cors-anywhere (fix later)
  // {
  //   id: 65,
  //   call_sign: "WBWC",
  //   broadcast_frequency: "88.3",
  //   audio_url: "https://cors-proxy.elfsight.com/http://wbwcradio.bw.edu:8000/",
  //   station_url: "https://www.wbwc.com/",
  //   college_name: "Baldwin Wallace University",
  //   public_private: "Private",
  //   city: "Berea",
  //   state: "OH",
  //   station_image:
  //     "https://cdn-profiles.tunein.com/s27671/images/logog.png?t=164311",
  //   college_image:
  //     "https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Baldwin_Wallace_Yellow_Jackets_logo.svg/800px-Baldwin_Wallace_Yellow_Jackets_logo.svg.png",
  // },
  // NOTE: KJHK doesn't seem to have a livestream link; the ones I found redirect you to an elevator music stream: http://streaming.radionomy.com/JamendoLounge
  // {
  //   id: 35,
  //   call_sign: "KJHK",
  //   broadcast_frequency: "90.7",
  //   audio_url: "https://streamingv2.shoutcast.com/kjhk",
  //   station_url: "https://kjhk.org/",
  //   college_name: "University of Kansas",
  //   public_private: "Public",
  //   city: "Lawrence",
  //   state: "KS",
  //   station_image:
  //     "https://i0.wp.com/kjhk.org/web/wp-content/uploads/2020/10/cropped-BestLogoM04.png?fit=512%2C512&ssl=1",
  //   college_image:
  //     "https://content.sportslogos.net/logos/32/718/full/kansas_jayhawks_logo_primary_20059568.png",
  // },
  // Stability issues with cors-anywhere, fix later
  // {
  //   id: 54,
  //   call_sign: "WXDU",
  //   broadcast_frequency: "88.7",
  //   audio_url:
  //     "https://cors-proxy.elfsight.com/http://weeping.wxdu.duke.edu:8000/wxdu128.mp3",
  //   station_url: "https://www.wxdu.org/",
  //   college_name: "Duke University",
  //   public_private: "Private",
  //   city: "Durham",
  //   state: "NC",
  //   station_image:
  //     "https://pbs.twimg.com/profile_images/633378260416643072/lKReF_R3_400x400.png",
  //   college_image:
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Duke_Athletics_logo.svg/1200px-Duke_Athletics_logo.svg.png",
  // },
  // Won't load on mobile or desktop (fix later)
  // {
  //   id: 56,
  //   call_sign: "WVPH",
  //   broadcast_frequency: "90.3",
  //   audio_url:
  //     "https://cors-proxy.elfsight.com/http://rsc417c1.rutgers.edu:8000/WRSU-FM",
  //   station_url: "https://www.thecore.fm/",
  //   college_name: "Rutgers University",
  //   public_private: "Public",
  //   city: "New Brunswick",
  //   state: "NJ",
  //   station_image:
  //     "https://cdn-profiles.tunein.com/s23615/images/logog.jpg?t=1",
  //   college_image:
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Rutgers_Scarlet_Knights_logo.svg/1153px-Rutgers_Scarlet_Knights_logo.svg.png",
  // },
];

export default stations;
