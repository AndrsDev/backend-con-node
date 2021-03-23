const { Transform } = require('stream');

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const data = chunk.toString();

    data.split(" ").map((word) => {
      this.push(word.charAt(0).toUpperCase() + word.slice(1));
    });
    
    callback()
  }
})

transformStream.prevLetter = ' ';
process.stdin.pipe(transformStream).pipe(process.stdout)