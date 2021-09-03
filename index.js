const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const app = express();
const MoviesService = require("./services/Movies");

const { gql } = require("apollo-server-express");

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
    movies: (root, _, { MoviesService }) => MoviesService.findAll(),
    movie: (root, { title }, { MoviesService }) =>
      MoviesService.findByName(title),
  },

  Movie: {
    scores: (movie) => movie,
  },

  MovieScores: {
    imdb: async (movie, _, { MoviesService }) => {
      const { imdbRating } = await MoviesService.findByName(movie.title);
      return imdbRating;
    },
    rottenTomatoes: async (movie, _, { MoviesService }) => {
      const { rottenTomatoesRating } = await MoviesService.findByName(
        movie.title
      );
      return rottenTomatoesRating;
    },
  },
};

const startup = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      MoviesService: MoviesService(),
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    introspection: true,
    playground: true,
    debug: true,
  });

  const path = "/graphql";
  const port = 1337;

  await server.start();

  server.applyMiddleware({ app, path });

  app.listen(port, () => {
    console.log(`Up at http://localhost:${port}${path}/`);
  });
};

startup();
