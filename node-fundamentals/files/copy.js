const fs = require('fs');

fs.copyFile('file.txt', 'copy.txt', err => {
  if(err) {
    console.error(err);
  }
})