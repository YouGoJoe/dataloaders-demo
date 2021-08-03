const API = require("../APIs/MoviesAPI");

module.exports = () => {
  const findAll = async () => {
    console.log("fetching data for all movies");
    const movies = await API.findAll();
    return movies;
  };

  const findByName = async (name) => {
    console.log(`fetching data for movie: ${name.toLowerCase()}`);
    return API.findByName(name);
  };

  const findByNames = async (names) => {
    console.log(`fetching data for movies: ${names.join(", ")}`);
    return API.findByNames(names);
  };

  return {
    findAll,
    findByName,
    findByNames,
  };
};
