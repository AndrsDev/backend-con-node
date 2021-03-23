const fs = require('fs');

fs.mkdir("platzi/escuela/node", { recursive: true }, err => {
  if(err) {
    console.error(err)
  }
})