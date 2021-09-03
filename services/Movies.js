const API = require("../APIs/MoviesAPI");

module.exports = () => {
  const findAll = async () => {
    console.log("fetching data for all movies");
    const movies = await API.findAll();
    return movies;
  };

  const findById = async (id) => {
    console.log(`fetching data for movie: ${id}`);
    return API.findById(id);
  };

  const findByIds = async (ids) => {
    console.log(`fetching data for movies: ${ids.join(", ")}`);
    return API.findByIds(ids);
  };

  return {
    findAll,
    findById,
    findByIds,
  };
};
