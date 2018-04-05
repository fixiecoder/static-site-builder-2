const path = require('path');
const fs = require('fs');

const scriptFiles = fs.readdirSync('src/js');
const env = process.env.buildEnv || 'production';

const entries = {};

scriptFiles.forEach(fileName => {
  entries[path.basename(fileName, '.js')] = path.resolve(__dirname, `src/js/${path.basename(fileName)}`);
});

module.exports = {
  entry: entries,
  mode: env,
  output: {
    filename: '[name].js',
    path: `${path.resolve(__dirname, 'dist/partial-scripts')}`,
  }
}