const palettes = [
  {
    sign: "CFRC",
    school: "Queen's University",
    palette: ["#fbbb14", "#09345a", "#bb1434"],
  },
  {
    sign: "CFUV",
    school: "University of Victoria",
    palette: ["#f5dcd3", "#292129", "#8aa6d0"],
  },
  {
    sign: "CHUO",
    school: "University of Ottawa",
    palette: ["#040404", "#080404", "#080404"],
  },
  {
    sign: "CITR",
    school: "University of British Columbia",
    palette: ["#d4b42c", "#24246c", "#acb84c"],
  },
  {
    sign: "CJIQ",
    school: "Conestoga College",
    palette: ["#ba9a63", "#040404", "#6c5c3c"],
  },
  {
    sign: "CKCU",
    school: "Carleton University",
    palette: ["#f9f9f9", "#090a0a", "#e43c3c"],
  },
  {
    sign: "KALX",
    school: "University of California, Berkeley",
    palette: ["#092f63", "#f2c134", "#fcf9f3"],
  },
  {
    sign: "KAMP",
    school: "University of Arizona",
    palette: ["#05255d", "#faf9fa", "#bd0f3e"],
  },
  {
    sign: "KANM",
    school: "Texas A&M University",
    palette: ["#540404", "#fbfbfb", "#a47c7c"],
  },
  {
    sign: "KCOU",
    school: "University of Missouri",
    palette: ["#edc96f", "#120f07", "#9d988a"],
  },
  {
    sign: "KCPR",
    school: "Calfornia Polytechnic State University, San Luis Obispo",
    palette: ["#063d34", "#eacf83", "#fafaf8"],
  },
  {
    sign: "KCSU",
    school: "Colorado State University",
    palette: ["#1c4c2c", "#fbfbfb", "#8ca494"],
  },
  {
    sign: "KDVS",
    school: "University of California, Davis",
    palette: ["#042c53", "#cb9304", "#9c7c14"],
  },
  {
    sign: "KFJC",
    school: "Foothill College",
    palette: ["#ac1c2c", "#8e1c24", "#b4202c"],
  },
  {
    sign: "KFSR",
    school: "California State University, Fresno",
    palette: ["#142b4b", "#c31434", "#7d1c3c"],
  },
  {
    sign: "KJHK",
    school: "University of Kansas",
    palette: ["#ea9012", "#053ca3", "#f4f6f9"],
  },
  {
    sign: "KMNR",
    school: "Missouri University of Science and Technology",
    palette: ["#eae1cf", "#055535", "#8aa274"],
  },
  {
    sign: "KOLN",
    school: "University of Cologne",
    palette: ["#447ca4", "#f6f8f9", "#85a7c5"],
  },
  {
    sign: "KRLX",
    school: "Carleton College",
    palette: ["#f2c848", "#10437f", "#8c9ca8"],
  },
  {
    sign: "KRUI",
    school: "University of Iowa",
    palette: ["#fad40a", "#040404", "#04040c"],
  },
  {
    sign: "KSPC",
    school: "Claremont Colleges",
    palette: ["#f5c20d", "#850904", "#f4df7a"],
  },
  {
    sign: "KTCU",
    school: "Texas Christian University",
    palette: ["#542c6c", "#582c6c", "#582c6c"],
  },
  {
    sign: "KTRU",
    school: "Rice University",
    palette: ["#04245c", "#041c5c", "#08245c"],
  },
  {
    sign: "KTSW",
    school: "Texas State University",
    palette: ["#ab9353", "#541c1c", "#724531"],
  },
  {
    sign: "KTUH",
    school: "University of Hawaii at Manoa",
    palette: ["#d7d8db", "#194634", "#86ac9c"],
  },
  {
    sign: "KUNM",
    school: "University of New Mexico",
    palette: ["#7b7980", "#cc1344", "#f8f7f7"],
  },
  {
    sign: "KUOM",
    school: "University of Minnesota",
    palette: ["#fbcb33", "#7c041c", "#a84a24"],
  },
  {
    sign: "KURE",
    school: "Iowa State University",
    palette: ["#8e2334", "#fbd03f", "#cd7332"],
  },
  {
    sign: "KVRX",
    school: "University of Texas at Austin",
    palette: ["#d46c2c", "#d86c2c", "#d86c2c"],
  },
  {
    sign: "KWVA",
    school: "University of Oregon",
    palette: ["#f2eb1c", "#176a42", "#7da434"],
  },
  {
    sign: "KXLU",
    school: "Loyola Marymount University",
    palette: ["#042c54", "#7c041c", "#b1b0b8"],
  },
  {
    sign: "KXUA",
    school: "University of Arkansas",
    palette: ["#9d2233", "#13090b", "#c7c7c7"],
  },
  {
    sign: "KZSC",
    school: "University of California, Santa Cruz",
    palette: ["#fbcc07", "#04143c", "#7c6444"],
  },
  {
    sign: "KZSU",
    school: "Stanford University",
    palette: ["#8d1616", "#e9e4e4", "#057464"],
  },
  {
    sign: "KZUU",
    school: "Washington State University",
    palette: ["#fbfafa", "#9c1c34", "#bf727f"],
  },
  {
    sign: "WBRU",
    school: "Brown University",
    palette: ["#0a0909", "#e9e9e9", "#dc2128"],
  },
  {
    sign: "WBWC",
    school: "Baldwin Wallace University",
    palette: ["#33251e", "#fac205", "#f9f9f8"],
  },
  {
    sign: "WCBN",
    school: "University of Michigan",
    palette: ["#fcd304", "#fcdc04", "#fcd414"],
  },
  {
    sign: "WDBM",
    school: "Michigan State University",
    palette: ["#1c443c", "#14443c", "#20443c"],
  },
  {
    sign: "WERS",
    school: "Emerson College",
    palette: ["#facb37", "#252424", "#7d7553"],
  },
  {
    sign: "WHRB",
    school: "Harvard University",
    palette: ["#151d24", "#f9f9f9", "#a6883c"],
  },
  {
    sign: "WHUS",
    school: "University of Connecticut",
    palette: ["#040c2c", "#eceded", "#e2042c"],
  },
  {
    sign: "WIUP",
    school: "Indiana University of Pennsylvania",
    palette: ["#9c1c34", "#a01c34", "#a01c34"],
  },
  {
    sign: "WKDU",
    school: "Drexel University",
    palette: ["#fcc404", "#ffc404", "#ffc404"],
  },
  {
    sign: "WKNC",
    school: "North Carolina State University",
    palette: ["#cb262e", "#0c0c0e", "#f6f3f3"],
  },
  {
    sign: "WKPS",
    school: "Penn State University",
    palette: ["#f2f3f6", "#062d64", "#7c8cb2"],
  },
  {
    sign: "WLUR",
    school: "Washington and Lee University",
    palette: ["#093698", "#e6e8ea", "#0e0e0e"],
  },
  {
    sign: "WMFO",
    school: "Tufts University",
    palette: ["#c8c2bb", "#3c8cdb", "#89a6c7"],
  },
  {
    sign: "WMSR",
    school: "Miami University",
    palette: ["#040404", "#b31c2b", "#520d15"],
  },
  {
    sign: "WMUC",
    school: "University of Maryland",
    palette: ["#e31c33", "#040404", "#fbd617"],
  },
  {
    sign: "WNSB",
    school: "Norfolk State University",
    palette: ["#047c54", "#fbfbfa", "#f3a405"],
  },
  {
    sign: "WPGU",
    school: "University of Illinois-Urbana-Champaign",
    palette: ["#eb4b24", "#142c4c", "#65383f"],
  },
  {
    sign: "WPRB",
    school: "Princeton University",
    palette: ["#040404", "#fb6304", "#fbfafa"],
  },
  {
    sign: "WPTS",
    school: "University of Pittsburgh",
    palette: ["#faba1c", "#043493", "#57626b"],
  },
  {
    sign: "WRAS",
    school: "Georgia State University",
    palette: ["#e7bbc8", "#043ca4", "#6484cc"],
  },
  {
    sign: "WREK",
    school: "Georgia Institute of Technology",
    palette: ["#251d1d", "#e8b12c", "#f6f6f6"],
  },
  {
    sign: "WRPI",
    school: "Rensselaer Polytechnic Institute",
    palette: ["#e3241c", "#242424", "#70241d"],
  },
  {
    sign: "WRUV",
    school: "University of Vermont",
    palette: ["#053c0f", "#9d5e0f", "#f7d15c"],
  },
  {
    sign: "WRUW",
    school: "Case Western Reserve University",
    palette: ["#223e4e", "#939ea6", "#738493"],
  },
  {
    sign: "WSBF",
    school: "Clemson University",
    palette: ["#f36b2c", "#532780", "#6f4d9b"],
  },
  {
    sign: "WSUM",
    school: "University of Wisconsin—Madison",
    palette: ["#a30505", "#f9f7f7", "#0c0707"],
  },
  {
    sign: "WTBU",
    school: "Boston University",
    palette: ["#ba0613", "#070606", "#f1eff0"],
  },
  {
    sign: "WTUL",
    school: "Tulane University",
    palette: ["#fbfbfb", "#04644c", "#43c3e3"],
  },
  {
    sign: "WUCF",
    school: "University of Central Florida",
    palette: ["#040404", "#b3a36c", "#fbfbfb"],
  },
  {
    sign: "WUML",
    school: "University of Massachusetts Lowell",
    palette: ["#056bb3", "#d32434", "#f9fafb"],
  },
  {
    sign: "WUNH",
    school: "University of New Hampshire",
    palette: ["#06265d", "#dcddde", "#647494"],
  },
  {
    sign: "WUOG",
    school: "University of Georgia",
    palette: ["#040404", "#fafafa", "#af1531"],
  },
  {
    sign: "WUTK",
    school: "University of Tennessee, Knoxville",
    palette: ["#fc8404", "#ff8404", "#ff8404"],
  },
  {
    sign: "WUVT",
    school: "Virginia Tech",
    palette: ["#a2392c", "#fbfafa", "#ad8790"],
  },
  {
    sign: "WVFS",
    school: "Florida State University",
    palette: ["#452d34", "#ede8db", "#b0a79a"],
  },
  {
    sign: "WVJC",
    school: "Wabash Valley College",
    palette: ["#120d0e", "#ec163c", "#869c9f"],
  },
  {
    sign: "WVPH",
    school: "Rutgers University",
    palette: ["#cb142c", "#241c23", "#8c1429"],
  },
  {
    sign: "WVUD",
    school: "University of Delaware",
    palette: ["#096ead", "#fbdc05", "#f2f6f5"],
  },
  {
    sign: "WVUM",
    school: "University of Miami",
    palette: ["#f35b04", "#045333", "#f8f6f3"],
  },
  {
    sign: "WWVU",
    school: "West Virginia University",
    palette: ["#042c54", "#042454", "#082c54"],
  },
  {
    sign: "WXTJ",
    school: "University of Virginia",
    palette: ["#fb5714", "#0f3057", "#6a3b37"],
  },
  {
    sign: "WXYC",
    school: "University of North Carolina at Chapel Hill",
    palette: ["#a4c0e4", "#263663", "#5e6687"],
  },
  {
    sign: "WZBC",
    school: "Boston College",
    palette: ["#5e212d", "#ddceab", "#ac8c7b"],
  },
];

export default palettes;
