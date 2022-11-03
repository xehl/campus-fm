const imageDownloader = require("node-image-downloader");

// copy/paste station object or import as module

let stationImgArray = [];
let collegeImgArray = [];

// // add image links to array
// stations.forEach((station) => {
//   stationImgArray.push({
//     uri: station.station_image,
//     filename: `${station.call_sign}-stationimg`,
//   });
//   collegeImgArray.push({
//     uri: station.college_image,
//     filename: `${station.call_sign}-schoolimg`,
//   });
// });

// imageDownloader({
//   imgs: stationImgArray,
//   dest: "./public/images/",
// })
//   .then((info) => {
//     console.log("stations all done", info);
//   })
//   .catch((error, response, body) => {
//     console.log("stations error");
//     console.log(error);
//   });

// imageDownloader({
//   imgs: collegeImgArray,
//   dest: "./public/images/",
// })
//   .then((info) => {
//     console.log("colleges all done", info);
//   })
//   .catch((error, response, body) => {
//     console.log("college error");
//     console.log(error);
//   });
