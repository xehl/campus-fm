// Simple test script to verify the stations data can be loaded
const stations = require('./src/stations.js');

console.log('Testing stations data...');
console.log('Number of stations:', stations.default ? stations.default.length : stations.length);
console.log('First station:', JSON.stringify(stations.default ? stations.default[0] : stations[0], null, 2));
console.log('✅ Stations data loaded successfully!');
