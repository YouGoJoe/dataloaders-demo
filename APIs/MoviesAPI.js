const movieData = require("./data.json");

module.exports = {
  findAll: async () => {
    console.log("fetching data for all movies");
    return movieData;
  },

  findById: async (id) => {
    console.log(`fetching data for movie: ${id}`);
    return movieData.find((movie) => movie.id === id);
  },

  findByIds: async (ids) => {
    console.log(`fetching data for movies: ${ids.join(", ")}`);

    return movieData.filter((movie) => ids.includes(movie.id));
  },
};
