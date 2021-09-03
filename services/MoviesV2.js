const API = require("../APIs/MoviesAPI");

const DataLoader = require("dataloader");

module.exports = () => {
  // create a new instance of a DataLoader
  const moviesLoader = new DataLoader(async (keys) => {
    // Batch fetch from data store
    const foundMovies = await API.findByIds(keys);

    // map keys back to their found values (or `null` if not found)
    return keys.map((key) => foundMovies.find((movie) => key === movie.id));
  });

  const findAll = async () => {
    const movies = await API.findAll();
    movies.map((movie) => moviesLoader.prime(movie.id, movie));
    return movies;
  };

  const findById = async (id) => moviesLoader.load(id);

  const findByIds = async (ids) => moviesLoader.loadMany(ids.map((id) => id));

  return {
    findAll,
    findById,
    findByIds,
  };
};
