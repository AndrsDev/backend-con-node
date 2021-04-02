// yarn seed:movies

import { green, red } from 'chalk';
import MongoLib from 'libraries/mongoLib';
import { moviesMock } from 'utils/mocks/moviesMock';
import { Movie } from 'models/movie';
import debug from 'debug';
const log = debug('app:scripts:users');

async function seedMovies() {
  try {
    const mongoDB = new MongoLib();

    const promises = moviesMock.map(async (movie: Movie) => {
      await mongoDB.create('movies', movie);
    });

    await Promise.all(promises);
    log(green(`${promises.length} movies have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    log(red(error));
    process.exit(1);
  }
}

seedMovies();
