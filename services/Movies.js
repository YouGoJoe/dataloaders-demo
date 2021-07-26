const movieData = require("../data.json");

module.exports = () => {
  const findAll = () => movieData;

  const findByName = (name) => {
    console.log(`fetching data for movie: ${name.toLowerCase()}`);
    return movieData.find(
      (movie) => movie.title.toLowerCase() === name.toLowerCase()
    );
  };

  return {
    findAll,
    findByName,
  };
};
