import express, { Express } from 'express';
import { MoviesService } from 'services/movies.service';

function moviesAPI(app: Express) {
  const router = express.Router();
  const moviesService = new MoviesService();
  app.use('/api/movies', router);


  router.get('/', async function(_, res, next) {
    try {
      const movies = await moviesService.getMovies();
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:id', async function(req, res, next) {
    const { id } = req.params;
    try {
      const movies = await moviesService.getMovie(Number(id));
      res.status(200).json({
        data: movies,
        message: 'movie retrieved'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async function(req, res, next) {
    const { body } = req;
    try {
      const createdMovieId = await moviesService.createMovie(body);
      res.status(201).json({
        data: createdMovieId,
        message: 'movie created'
      })
    } catch (error) {
      next(error)
    }
  })

  router.put('/:id', async function(req, res, next) {
    const { id } = req.params;
    const { body } = req;
    try {
      const updatedMovieId = await moviesService.updateMovie(Number(id), body);
      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated'
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:id', async function(req, res, next) {
    const { id } = req.params;
    try {
      const deletedMovieId = await moviesService.deleteMovie(Number(id))
      res.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted'
      })
    } catch (error) {
      next(error)
    }
  })
}

export default moviesAPI