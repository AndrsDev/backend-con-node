const util = require('util');

const helloPluto = util.deprecate(() => {
  console.log('Hello from pluto')
}, 'Pluto is depracated')

helloPluto();