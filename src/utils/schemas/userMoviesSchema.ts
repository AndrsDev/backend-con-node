import joi from 'joi';
import { userIdSchema } from 'utils/schemas/userSchema';
import { movieIdSchema } from 'utils/schemas/movieSchema';

const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserMovieSchema = {
  userId: userIdSchema,
  movieId: movieIdSchema,
};

export { userMovieIdSchema, createUserMovieSchema };
