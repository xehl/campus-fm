// DESCRIPTION:
// takes in a single image path and logs its 4 color palette in the console
// requires the school image to be properly formatted and located in ./public/images folder

const path = require("path");
const fs = require("fs");
const getColors = require("get-image-colors");
// controls # of colors in the palette; setting it to 4 for now
const options = {
  count: 4,
};

// input
// getPalette("WRCP");
// getPalette("WKOW");
// getPalette("LR11");
// getPalette("OXID");
// getPalette("CAMF");
// getPalette("XEUN");
// getPalette("WTHS");

async function getPalette(callsign) {
  // find image path
  let imagepath = "";
  var files = fs.readdirSync("../public/images/");
  files.find((file) => {
    if (
      file.substring(5, 11) === "school" &&
      file.substring(0, 4) === callsign.toUpperCase()
    ) {
      imagepath = file;
    }
    return null;
  });

  let paletteArr = [];

  let colors = await getColors(
    path.join("../public/images/", imagepath),
    options
  );

  colors.map((color) => {
    paletteArr.push(color.hex());
    return null;
  });
  console.log("Palette for : " + imagepath);
  console.log(paletteArr);
}
