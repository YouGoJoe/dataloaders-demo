# dataloaders-demo

A demo app to help explore the use of DataLoaders in a GraphQL server

This app can be run with:

```
make start
```

This project is set up to have two "versions" of the same Service with slightly different implementations. [`/services/Movies.js`](./services/Movies.js) is an implementation that does **not** leverage DataLoaders, whereas [`/services/MoviesV2.js`](./services/MoviesV2.js) exposes the same methods, but it leverages DataLoaders. Logging has been added to the (fake) [`/APIs/MoviesAPI.js`](./APIs/MoviesAPI.js) module to attempt to show off the number of outbound requests you could expect if this project were running in a production system.

You can quickly switch between the DataLoader and non-DataLoader versions of the Movies Service by replacing the line in [`/index.js`](./index.js) that imports `MoviesService`:

```javascript
// use non-DataLoader version
const MoviesService = require("./services/Movies");

// use DataLoader version
const MoviesService = require("./services/MoviesV2");
```

The Service is re-initialized in the `context` of every request (see [`/index.js`](./index.js)), which is why the DataLoader is defined in the closure of the Movies Service.
