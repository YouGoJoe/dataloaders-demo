const { gql } = require("apollo-server-express");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const app = express();
const MoviesService = require("./services/Movies");

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
    "The movie's rating on Rotten Tomatoes"
    rottenTomatoesRating: Int
    "The movie's rating on IMDB"
    imdbRating: Float
  }
`;

const resolvers = {
  Query: {
    movies: () => MoviesService().findAll(),
    movie: (root, { title }) => MoviesService().findByName(title),
  },
};

const startup = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
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
