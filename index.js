const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const app = express();
const { typeDefs, resolvers } = require("./types/Movies");
const MoviesService = require("./services/Movies");

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
