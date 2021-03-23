const EventEmitter = require('events');

class Logger extends EventEmitter {
  execute(callback) {
    console.log('Before');
    this.emit('start');
    callback();
    this.emit('finish');
    console.log('After');
  }
}

const logger = new Logger();

logger.on('start', () => console.log('Starting'));
logger.on('finish', () => console.log('Finishing'));

logger.execute(() => console.log('Hello world'));
// logger.execute(() => setTimeout(() => console.log('Hello world'), 0));