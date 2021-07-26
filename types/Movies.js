const { gql } = require("apollo-server-express");
const MoviesService = require("../services/Movies");

const typeDefs = gql`
  scalar DateTime

  type Query {
    "All movies"
    movies: [Movie!]

    "Find a movie by its name"
    movie(title: String!): Movie
  }
  "A movie's theatrical release information"
  type Movie {
    "The title of the movie"
    title: String
    "The date the movie was released"
    releaseDate: DateTime
    "The MPAA rating for this movie"
    rating: String
    "The genre of this movie"
    genre: String
    "The name of the director"
    director: String
    "How well this movie did according to audiences/critics"
    scores: MovieScores
  }

  type MovieScores {
    "The movie's rating on IMDB"
    imdb: Float
    "The movie's rating on Rotten Tomatoes"
    rottenTomatoes: Int
  }
`;

const resolvers = {
  Query: {
    movies: () => MoviesService().findAll(),
    movie: (root, { title }) => MoviesService().findByName(title),
  },

  Movie: {
    scores: (movie) => movie,
  },

  MovieScores: {
    imdb: (movie) => MoviesService().findByName(movie.title).imdbRating,
    rottenTomatoes: (movie) =>
      MoviesService().findByName(movie.title).rottenTomatoesRating,
  },
};

module.exports = { typeDefs, resolvers }