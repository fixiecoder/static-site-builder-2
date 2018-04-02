const path = require('path');
const fs = require('fs');

const scriptFiles = fs.readdirSync('src/js');

const entries = {};

scriptFiles.forEach(fileName => {
  console.log(path.basename(fileName, '.js'))
  entries[path.basename(fileName, '.js')] = path.resolve(__dirname, `src/js/${path.basename(fileName)}`);
});

module.exports = {
  entry: entries,
  mode: 'production',
  output: {
    filename: '[name].js',
    path: `${path.resolve(__dirname, 'dist/partial-scripts')}`,
  }
}