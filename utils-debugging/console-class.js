const fs = require('fs');

const out = fs.createWriteStream('./output.log');
const err = fs.createWriteStream('./error.log');

const consoleFile = new console.Console(out, err);

setInterval(() => {
  consoleFile.log(new Date());
  consoleFile.error(new Error('Oooops'));
}, 1000);
