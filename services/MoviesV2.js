const API = require("../APIs/MoviesAPI");

const DataLoader = require("dataloader");

module.exports = () => {
  // create a new instance of a DataLoader
  const moviesLoader = new DataLoader(async (keys) => {
    console.log(`fetching data for movies: ${keys.join(", ")}`);

    // Batch fetch from data store
    const foundMovies = await API.findByIds(keys);

    // map keys back to their found values (or `null` if not found)
    return keys.map((key) =>
      foundMovies.find((movie) => Number(key) === movie.id)
    );
  });

  const findAll = async () => {
    console.log("fetching data for all movies");
    const movies = await API.findAll();
    movies.map((movie) => moviesLoader.prime(movie.id, movie));
    return movies;
  };

  const findById = async (id) => {
    console.log(`fetching data for movie: ${id}`);
    return moviesLoader.load(Number(id));
  };

  const findByIds = async (ids) => {
    console.log(`fetching data for movies: ${ids.join(", ")}`);
    return moviesLoader.loadMany(ids.map(id => Number(id)));
  };

  return {
    findAll,
    findById,
    findByIds,
  };
};
