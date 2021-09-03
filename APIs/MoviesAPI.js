const movieData = require("./data.json");

module.exports = {
  findAll: async () => {
    return movieData;
  },

  findById: async (id) => {
    return movieData.find((movie) => movie.id === Number(id));
  },

  findByIds: async (ids) => {
    const parsedIds = ids.map((id) => Number(id));

    return movieData.filter((movie) => parsedIds.includes(movie.id));
  },
};
