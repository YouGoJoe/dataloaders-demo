const movieData = require("../data.json");

module.exports = {
  findAll: async () => {
    return movieData;
  },

  findByName: async (name) => {
    return movieData.find(
      (movie) => movie.title.toLowerCase() === name.toLowerCase()
    );
  },

  findByNames: async (names) => {
    const movieTitlesLower = names.map((name) => name.toLowerCase());

    return movieData.filter((movie) =>
      movieTitlesLower.includes(movie.title.toLowerCase())
    );
  },
};
