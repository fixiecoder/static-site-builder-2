const fs = require('fs');
const path = require('path');

const dirContents = fs.readdirSync(`${process.cwd()}/dist/partial-scripts`);
const scriptsPaths = `${process.cwd()}/dist/partial-scripts`;
dirContents.forEach(fileName => {
  if(path.extname(fileName) === '.js') {
    fs.renameSync(`${scriptsPaths}/${fileName}`, `${scriptsPaths}/${path.basename(fileName, '.js')}.handlebars`);
  }
});