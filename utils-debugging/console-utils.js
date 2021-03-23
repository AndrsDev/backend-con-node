const util = require('util')
// %s --> string
// %d --> number
// %j --> object

// console.log("Un %s y un %s", "perrito", "gatito")
// const message = util.format("Un %s y un %s", "perrito", "gatito")  
// console.log(message)

// console.info('Hello world')
// console.warn('This is an error')
// console.assert(42 === '42')

// console.trace('Hello')

/* 
  To run: 
  NODE_DEBUG=foo node console-utils.js 
*/
const debuglog = util.debuglog('foo');
debuglog('Hello from foo')
