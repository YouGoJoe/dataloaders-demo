const movieData = require("../data.json");

module.exports = () => {
  const findAll = () => movieData;

  const findByName = (name) =>
    movieData.find((movie) => movie.title.toLowerCase() === name.toLowerCase());

  return {
    findAll,
    findByName,
  };
};
