const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  const src = fs.createReadStream('./file.txt');
  src.pipe(res);
})

server.listen(3000);