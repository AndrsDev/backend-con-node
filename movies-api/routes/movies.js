const express = require('express');
const { moviesMock } = require('../utils/mocks/movies')

function moviesAPI(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  router.get('/', async function(req, res, next) {
    try {
      const movies = await Promise.resolve(moviesMock);
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:id', async function(req, res, next) {
    try {
      const movies = await Promise.resolve(moviesMock[req.params.id]);
      res.status(200).json({
        data: movies,
        message: 'movie retrieved'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async function(req, res, next) {
    try {
      const createdMovieId = await Promise.resolve(moviesMock[0].id);
      res.status(201).json({
        data: createdMovieId,
        message: 'movie created'
      })
    } catch (error) {
      next(error)
    }
  })

  router.put('/:id', async function(req, res, next) {
    try {
      const updatedMovieId = await Promise.resolve(moviesMock[0].id);
      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated'
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:id', async function(req, res, next) {
    try {
      const deletedMovieId = await Promise.resolve(moviesMock[0].id);
      res.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = moviesAPI