const API = require("../APIs/MoviesAPI");

const DataLoader = require("dataloader");

module.exports = () => {
  // create a new instance of a DataLoader
  const moviesLoader = new DataLoader(async (keys) => {
    console.log(`fetching data for movies: ${keys.join(", ")}`);

    // Batch fetch from data store
    const foundMovies = await API.findByNames(keys);

    // map keys back to their found values (or `null` if not found)
    return keys.map((key) =>
      foundMovies.find(
        (movie) => key.toLowerCase() === movie.title.toLowerCase()
      )
    );
  });

  const findAll = async () => API.findAll();

  const findByName = async (name) => {
    return moviesLoader.load(name.toLowerCase());
  };

  return {
    findAll,
    findByName,
  };
};
