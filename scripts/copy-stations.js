const fs = require('fs');
const path = require('path');

// Copy stations data from src to functions directory
const srcPath = path.join(__dirname, '../src/stations.js');
const destPath = path.join(__dirname, '../netlify/functions/stations-data.js');

try {
  fs.copyFileSync(srcPath, destPath);
  console.log('✅ Stations data copied to functions directory');
} catch (error) {
  console.error('❌ Error copying stations data:', error);
  process.exit(1);
}
