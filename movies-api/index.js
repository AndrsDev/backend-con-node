const { config } = require('./config/index');
const moviesAPI = require('./routes/movies');
const express = require('express');
const app = express();

moviesAPI(app);

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})