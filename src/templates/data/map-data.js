const rawData = require('./raw-data.json');
const fs = require('fs');

const data = rawData.filter(record => !record.undocumented).map(item => {
  return {
    name: item.name,
    description: item.description,
    params: item.params,
    scope: item.scope,
    returns: item.returns ? {
      type: item.returns[0].type.names[0],
      description: item.returns[0].description,
    } : null,
  }
});

fs.writeFile(`${__dirname}/data.json`, JSON.stringify(data, null, '  '), (err) => {
  if(err) {
    console.log(err);
  } else  {
    console.log('Template data saved to:', `${__dirname}/data.json`);
  }
});

